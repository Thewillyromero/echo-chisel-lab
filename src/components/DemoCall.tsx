import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, User, Loader2, Sparkles, Mic, MicOff,
  PhoneOff, Volume2, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import Vapi from "@vapi-ai/web";
import { useLiveMetricsContext } from "@/contexts/LiveMetricsContext";

const VAPI_PUBLIC_KEY = "47ea7042-5d4a-4bb0-9995-0762b2f51ee2";
const ASSISTANT_ID = "c54bd4a1-68ef-4913-9207-906c44d625b0";
const CALENDAR_URL = "https://api.leadconnectorhq.com/widget/booking/m4SFv9fHyIZraSrAu8QT";

type CallState = "idle" | "connecting" | "active" | "ended";

/* Animated waveform */
const WaveformBars = ({ active, volume }: { active: boolean; volume: number }) => (
  <div className="flex items-center justify-center gap-[3px] h-12">
    {[...Array(16)].map((_, i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full bg-brand-teal"
        animate={
          active
            ? {
                height: [
                  8,
                  8 + volume * 30 + Math.random() * 12,
                  8,
                ],
                opacity: [0.4, 0.6 + volume * 0.4, 0.4],
              }
            : { height: 4, opacity: 0.15 }
        }
        transition={
          active
            ? {
                duration: 0.3 + Math.random() * 0.3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.04,
              }
            : { duration: 0.3 }
        }
      />
    ))}
  </div>
);

/* Call timer */
const CallTimer = ({ startTime }: { startTime: number }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return (
    <span className="text-sm text-muted-foreground font-mono tabular-nums">
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </span>
  );
};

const DemoCall = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [callState, setCallState] = useState<CallState>("idle");
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [callStartTime, setCallStartTime] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const vapiRef = useRef<InstanceType<typeof Vapi> | null>(null);
  const { testCount, viewers, incrementTest } = useLiveMetricsContext();

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (vapiRef.current) {
        try { vapiRef.current.stop(); } catch {}
      }
    };
  }, []);

  const startWebCall = useCallback(() => {
    try {
      /* Create Vapi instance INSIDE the click handler so the browser
         grants microphone access (requires direct user gesture). */
      const vapi = new Vapi(VAPI_PUBLIC_KEY);
      vapiRef.current = vapi;
      setCallState("connecting");

      /* Fallback: if call-start doesn't fire in 10s, open calendar */
      const fallbackTimer = setTimeout(() => {
        if (vapiRef.current) {
          try { vapiRef.current.stop(); } catch {}
        }
        toast.error("No se pudo conectar. Te redirigimos para agendar una demo.");
        window.open(CALENDAR_URL, "_blank");
        setCallState("idle");
        vapiRef.current = null;
      }, 10000);

      vapi.on("call-start", () => {
        clearTimeout(fallbackTimer);
        setCallState("active");
        setCallStartTime(Date.now());
        incrementTest();
        toast.success("Conectado con ARIA");
      });

      vapi.on("call-end", () => {
        clearTimeout(fallbackTimer);
        setCallState("ended");
        vapiRef.current = null;
      });

      vapi.on("speech-start", () => setIsSpeaking(true));
      vapi.on("speech-end", () => setIsSpeaking(false));

      vapi.on("volume-level", (level: number) => {
        setVolume(level);
      });

      vapi.on("error", (err: unknown) => {
        clearTimeout(fallbackTimer);
        console.error("Web call error:", JSON.stringify(err, null, 2));
        console.error("Error type:", typeof err, "Keys:", err && typeof err === "object" ? Object.keys(err) : "N/A");
        toast.error("Error en la conexión. Inténtalo de nuevo.");
        setCallState("idle");
        vapiRef.current = null;
      });

      /* Use positional arg for assistant ID */
      vapi.start(ASSISTANT_ID);
    } catch (err) {
      console.error("Failed to start call:", err);
      toast.error("Error al iniciar la llamada.");
      setCallState("idle");
    }
  }, []);

  const endCall = useCallback(() => {
    if (vapiRef.current) {
      try { vapiRef.current.stop(); } catch {}
    }
    setCallState("ended");
    vapiRef.current = null;
  }, []);

  const toggleMute = useCallback(() => {
    if (vapiRef.current) {
      const newMuted = !muted;
      vapiRef.current.setMuted(newMuted);
      setMuted(newMuted);
    }
  }, [muted]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const name = form.name.trim();
      const phone = form.phone.trim();

      if (!name || name.length < 2) {
        toast.error("Introduce tu nombre (mín. 2 caracteres).");
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("demo-call", {
          body: {
            name,
            phone: phone || "web-call",
            email: form.email.trim() || undefined,
          },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        /* Lead saved — now start web call */
        startWebCall();
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Error al procesar.";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [form, startWebCall]
  );

  const handleReset = () => {
    setCallState("idle");
    setForm({ name: "", phone: "", email: "" });
    setVolume(0);
    setMuted(false);
    setIsSpeaking(false);
  };

  return (
    <section
      id="demo"
      className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-brand-teal/[0.04] blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[150px] pointer-events-none" />
      {/* Background character — ARIA (left) */}
      <div className="absolute -left-10 top-1/4 pointer-events-none select-none hidden md:block">
        <img src={agentInbound} alt="" className="w-[300px] md:w-[500px] opacity-[0.12] rotate-6" loading="lazy" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-teal/[0.08] border border-brand-teal/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
              <span className="text-xs text-brand-teal font-display font-semibold tracking-wide">
                Prueba en vivo
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-5 tracking-tight leading-[1.1] text-glow">
              Habla con{" "}
              <span className="text-gradient text-glow-teal">ARIA ahora mismo</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-8 max-w-lg">
              Escribe tu nombre y habla directamente con nuestra asistente IA
              desde tu navegador. Sin descargas, sin esperas.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Mic, text: "Conversación en tiempo real desde tu navegador" },
                { icon: Volume2, text: "Voz natural en español — pregunta lo que quieras" },
                { icon: Phone, text: "Sin instalar nada, solo activa tu micrófono" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-teal/10 border border-brand-teal/15 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-brand-teal" />
                  </div>
                  <span className="text-sm text-foreground/80">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground/50">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>
                  <span className="font-display font-semibold text-foreground/70 tabular-nums">{testCount}</span> tests con ARIA este mes
                </span>
              </div>
              <span className="text-muted-foreground/20">·</span>
              <span>
                <span className="font-semibold text-foreground/60 tabular-nums">{viewers}</span> personas en la web
              </span>
            </div>
          </motion.div>

          {/* Right side — card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-brand-teal/[0.06] to-transparent blur-2xl pointer-events-none" />

              <div className="relative rounded-3xl border border-border/30 overflow-hidden backdrop-blur-sm">
                {/* Card header */}
                <div className="bg-gradient-to-r from-brand-teal/[0.08] via-card/60 to-card/40 border-b border-border/20 px-6 py-4 flex items-center gap-4">
                  <motion.img
                    src={agentInbound}
                    alt="ARIA"
                    className="w-12 h-12 object-contain drop-shadow-lg"
                    animate={
                      callState === "active" && isSpeaking
                        ? { scale: [1, 1.08, 1], rotate: [0, -2, 2, 0] }
                        : { y: [0, -3, 0] }
                    }
                    transition={
                      callState === "active" && isSpeaking
                        ? { duration: 0.4, repeat: Infinity }
                        : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }
                    width={512}
                    height={512}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-display font-bold text-brand-teal">ARIA</span>
                      <span
                        className={`w-2 h-2 rounded-full animate-pulse ${
                          callState === "active" ? "bg-emerald-400" : callState === "connecting" ? "bg-amber-400" : "bg-muted-foreground/30"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-medium ${
                          callState === "active" ? "text-emerald-400" : callState === "connecting" ? "text-amber-400" : "text-muted-foreground/50"
                        }`}
                      >
                        {callState === "active"
                          ? "En llamada"
                          : callState === "connecting"
                          ? "Conectando..."
                          : callState === "ended"
                          ? "Llamada finalizada"
                          : "Disponible"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Asistente de demostración CALLA
                    </p>
                  </div>
                  {callState === "active" && <CallTimer startTime={callStartTime} />}
                </div>

                {/* Card body */}
                <div className="relative p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {/* === FORM STATE === */}
                    {callState === "idle" && (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div className="space-y-1.5">
                          <Label htmlFor="demo-name" className="text-sm text-foreground/80 font-medium">
                            <User className="inline h-3.5 w-3.5 mr-1.5 text-muted-foreground/60" />
                            Tu nombre *
                          </Label>
                          <Input
                            id="demo-name"
                            placeholder="Ej: Carlos García"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            maxLength={100}
                            required
                            className="bg-secondary/40 border-border/30 h-12 text-base rounded-xl focus:border-brand-teal/50 focus:ring-brand-teal/20"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="demo-phone" className="text-sm text-foreground/80 font-medium">
                              <Phone className="inline h-3.5 w-3.5 mr-1.5 text-muted-foreground/60" />
                              Teléfono
                            </Label>
                            <Input
                              id="demo-phone"
                              type="tel"
                              placeholder="+34 600 000 000"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              maxLength={20}
                              className="bg-secondary/40 border-border/30 h-12 text-base rounded-xl focus:border-brand-teal/50 focus:ring-brand-teal/20"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="demo-email" className="text-sm text-foreground/80 font-medium">
                              <Mail className="inline h-3.5 w-3.5 mr-1.5 text-muted-foreground/60" />
                              Email
                            </Label>
                            <Input
                              id="demo-email"
                              type="email"
                              placeholder="tu@empresa.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              maxLength={100}
                              className="bg-secondary/40 border-border/30 h-12 text-base rounded-xl focus:border-brand-teal/50 focus:ring-brand-teal/20"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={loading}
                          className="w-full rounded-xl text-base h-13 font-display font-semibold shadow-lg shadow-brand-teal/20 hover:shadow-brand-teal/30 hover:scale-[1.01] transition-all duration-300"
                          style={{ background: "linear-gradient(135deg, hsl(190 60% 50%), hsl(190 60% 42%))" }}
                        >
                          {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <>
                              <Mic className="mr-2 h-5 w-5" />
                              Hablar con ARIA
                            </>
                          )}
                        </Button>

                        <p className="text-[11px] text-muted-foreground/35 text-center leading-relaxed">
                          Tu navegador pedirá permiso de micrófono · Sin coste · Conversación de ~2 min
                        </p>
                      </motion.form>
                    )}

                    {/* === CONNECTING STATE === */}
                    {callState === "connecting" && (
                      <motion.div
                        key="connecting"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center text-center py-8"
                      >
                        <div className="relative mb-6">
                          <div className="w-20 h-20 rounded-full bg-brand-teal/10 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
                          </div>
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-brand-teal/30"
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>
                        <h3 className="font-display font-bold text-lg text-foreground mb-2">
                          Conectando con ARIA...
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Permite el acceso al micrófono cuando tu navegador lo solicite
                        </p>
                      </motion.div>
                    )}

                    {/* === ACTIVE CALL STATE === */}
                    {callState === "active" && (
                      <motion.div
                        key="active"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center py-4"
                      >
                        {/* Waveform */}
                        <div className="mb-6 w-full">
                          <WaveformBars active={true} volume={volume} />
                        </div>

                        <p className="text-sm text-muted-foreground mb-1">
                          {isSpeaking ? "ARIA está hablando..." : "Escuchando..."}
                        </p>
                        <p className="text-xs text-muted-foreground/40 mb-8">
                          {form.name}, habla con naturalidad
                        </p>

                        {/* Call controls */}
                        <div className="flex items-center gap-4">
                          <button
                            onClick={toggleMute}
                            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                              muted
                                ? "bg-destructive/20 text-destructive border border-destructive/30"
                                : "bg-secondary/60 text-foreground hover:bg-secondary border border-border/30"
                            }`}
                          >
                            {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                          </button>

                          <button
                            onClick={endCall}
                            className="w-16 h-16 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg shadow-destructive/30 hover:bg-destructive/90 transition-all duration-300 hover:scale-105"
                          >
                            <PhoneOff className="w-6 h-6" />
                          </button>

                          <div className="w-14 h-14 rounded-full bg-secondary/40 border border-border/20 flex items-center justify-center">
                            <Volume2 className="w-5 h-5 text-muted-foreground/50" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* === ENDED STATE === */}
                    {callState === "ended" && (
                      <motion.div
                        key="ended"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center py-6"
                      >
                        <div className="w-16 h-16 rounded-full bg-brand-teal/10 flex items-center justify-center mb-5">
                          <Phone className="w-7 h-7 text-brand-teal" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-foreground mb-2">
                          ¡Gracias por probar CALLA!
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                          {form.name}, nuestro equipo te contactará pronto para una demo
                          personalizada de tu sector.
                        </p>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleReset}
                            className="rounded-full text-sm border-border/40"
                          >
                            Otra demo
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-full text-sm"
                            style={{ background: "linear-gradient(135deg, hsl(190 60% 50%), hsl(190 60% 42%))" }}
                            onClick={() => window.open(CALENDAR_URL, "_blank")}
                          >
                            Agendar demo personalizada
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoCall;
