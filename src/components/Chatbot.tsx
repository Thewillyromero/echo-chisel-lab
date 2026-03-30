import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import heroRobot from "@/assets/hero-robot.webp";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

function getSessionId() {
  let id = localStorage.getItem("calla_chat_session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("calla_chat_session", id);
  }
  return id;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: "", email: "" });
  const [emailLoading, setEmailLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef(getSessionId());

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showEmailCapture]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Load existing conversation on first open
  useEffect(() => {
    if (!open || initialized) return;
    setInitialized(true);

    (async () => {
      try {
        const { data } = await supabase.functions.invoke("chat", {
          body: { action: "load_conversation", session_id: sessionId.current },
        });
        if (data?.conversation_id) {
          setConversationId(data.conversation_id);
          if (data.visitor_email) setEmailCaptured(true);
          if (data.messages?.length > 0) {
            setMessages(data.messages.map((m: any) => ({ role: m.role, content: m.content })));
          }
        }
      } catch (e) {
        console.error("Failed to load conversation:", e);
      }
    })();
  }, [open, initialized]);

  // Ensure conversation exists
  const ensureConversation = useCallback(async () => {
    if (conversationId) return conversationId;
    try {
      const { data } = await supabase.functions.invoke("chat", {
        body: { action: "create_conversation", session_id: sessionId.current },
      });
      if (data?.conversation_id) {
        setConversationId(data.conversation_id);
        return data.conversation_id;
      }
    } catch (e) {
      console.error("Failed to create conversation:", e);
    }
    return null;
  }, [conversationId]);

  // Save message to DB (fire-and-forget)
  const saveMessage = useCallback((convId: string, role: string, content: string) => {
    supabase.functions.invoke("chat", {
      body: { action: "save_message", conversation_id: convId, role, content },
    }).catch(console.error);
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const convId = await ensureConversation();
    const userMsg: Msg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Save user message
    if (convId) saveMessage(convId, "user", text);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: updatedMessages,
          conversation_id: convId,
        }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Error de conexión");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              const snapshot = assistantSoFar;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: snapshot } : m
                  );
                }
                return [...prev, { role: "assistant", content: snapshot }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Save assistant message and check for email capture tag
      if (assistantSoFar && convId) {
        saveMessage(convId, "assistant", assistantSoFar.replace("[CAPTURE_EMAIL]", "").trim());
      }

      // Check for [CAPTURE_EMAIL] tag
      if (assistantSoFar.includes("[CAPTURE_EMAIL]") && !emailCaptured) {
        setShowEmailCapture(true);
        // Remove the tag from displayed message
        setMessages((prev) =>
          prev.map((m, i) =>
            i === prev.length - 1 && m.role === "assistant"
              ? { ...m, content: m.content.replace("[CAPTURE_EMAIL]", "").trim() }
              : m
          )
        );
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Error desconocido";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Lo siento, ha ocurrido un error: ${errorMsg}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, ensureConversation, saveMessage, emailCaptured]);

  const handleEmailSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.email.trim() || emailLoading) return;

    setEmailLoading(true);
    try {
      await supabase.functions.invoke("chat", {
        body: {
          action: "capture_email",
          conversation_id: conversationId,
          email: emailForm.email.trim(),
          name: emailForm.name.trim(),
        },
      });
      setEmailCaptured(true);
      setShowEmailCapture(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `¡Gracias${emailForm.name ? ` ${emailForm.name}` : ""}! 🎉 Nos pondremos en contacto contigo pronto a través de ${emailForm.email}. ¿Hay algo más en lo que pueda ayudarte?`,
        },
      ]);
    } catch {
      // silent fail
    } finally {
      setEmailLoading(false);
    }
  }, [emailForm, emailLoading, conversationId]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          open
            ? "bg-secondary text-foreground rotate-0"
            : "bg-primary text-primary-foreground glow-box hover:scale-110"
        }`}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] glass-warm rounded-2xl border border-border/30 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300"
          style={{ height: "min(520px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/20 shrink-0">
            <img loading="lazy" src={heroRobot} alt="ARIA" className="w-8 h-8 object-contain" width={64} height={64} />
            <div>
              <p className="text-sm font-display font-bold text-foreground">ARIA</p>
              <p className="text-[10px] text-muted-foreground">Asistente virtual de CALLA</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
              <span className="text-[10px] text-muted-foreground">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <img loading="lazy" src={heroRobot} alt="" className="w-16 h-16 mx-auto mb-3 opacity-40" width={64} height={64} />
                <p className="text-sm text-muted-foreground">
                  ¡Hola! 👋 Soy ARIA, tu asistente virtual. ¿En qué puedo ayudarte?
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary/80 text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-secondary/80 rounded-2xl rounded-bl-md px-3.5 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}

            {/* Email capture form */}
            {showEmailCapture && !emailCaptured && (
              <div className="bg-secondary/60 rounded-2xl p-4 border border-border/30">
                <p className="text-xs font-display font-bold text-foreground mb-2">
                  📧 ¿Quieres que te contactemos?
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-2">
                  <Input
                    placeholder="Tu nombre"
                    value={emailForm.name}
                    onChange={(e) => setEmailForm((f) => ({ ...f, name: e.target.value }))}
                    className="h-8 text-xs bg-secondary/50 border-border/30"
                    maxLength={100}
                  />
                  <Input
                    type="email"
                    placeholder="tu@email.com *"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm((f) => ({ ...f, email: e.target.value }))}
                    className="h-8 text-xs bg-secondary/50 border-border/30"
                    maxLength={255}
                    required
                  />
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      disabled={emailLoading || !emailForm.email.trim()}
                    >
                      {emailLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <>Enviar <ArrowRight className="ml-1 h-3 w-3" /></>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-muted-foreground"
                      onClick={() => setShowEmailCapture(false)}
                    >
                      Ahora no
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-border/20 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-secondary/50 border border-border/30 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/50"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="shrink-0 h-9 w-9 rounded-xl"
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
