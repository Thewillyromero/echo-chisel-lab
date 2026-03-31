import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Headphones, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import agentInbound from "@/assets/characters/agent-inbound.webp";

interface Message {
  role: "system" | "aria" | "client";
  text: string;
  delay: number;
}

const conversation: Message[] = [
  { role: "system", text: "Llamada entrante — Clínica Dental Mediterráneo", delay: 0 },
  { role: "aria", text: "¡Hola! Clínica Dental Mediterráneo, soy ARIA. ¿En qué puedo ayudarte?", delay: 1500 },
  { role: "client", text: "Hola, quería pedir cita para una limpieza dental", delay: 3000 },
  { role: "aria", text: "¡Claro! ¿Tienes preferencia de día? Tenemos hueco el jueves a las 10:00 o el viernes a las 16:30.", delay: 2500 },
  { role: "client", text: "El jueves a las 10 me viene perfecto", delay: 2000 },
  { role: "aria", text: "Perfecto. ¿Me das tu nombre completo para apuntarte?", delay: 1500 },
  { role: "client", text: "Carmen López García", delay: 1500 },
  { role: "aria", text: "Listo, Carmen. Tienes cita el jueves 3 de abril a las 10:00 para limpieza dental. Te llegará una confirmación por SMS. ¿Necesitas algo más?", delay: 3000 },
  { role: "client", text: "No, eso es todo. ¡Gracias!", delay: 1500 },
  { role: "aria", text: "¡A ti, Carmen! Nos vemos el jueves. ¡Que tengas buen día!", delay: 2000 },
  { role: "system", text: "Cita agendada en el calendario · Duración: 47 segundos", delay: 1500 },
];

const CallSimulator = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!isPlaying || step >= conversation.length) {
      if (step >= conversation.length) setIsPlaying(false);
      return;
    }
    setTyping(true);
    const typingDelay = setTimeout(() => {
      setTyping(false);
      setStep(s => s + 1);
    }, conversation[step].delay);
    return () => clearTimeout(typingDelay);
  }, [isPlaying, step]);

  const handleStart = () => {
    setStep(0);
    setIsPlaying(true);
    setTimeout(() => setStep(1), 500);
  };

  const visibleMessages = conversation.slice(0, step);

  return (
    <section id="simulador" className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-brand-teal/[0.08] border border-brand-teal/20 rounded-full px-4 py-1.5 mb-6">
            <Headphones className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-xs text-brand-teal font-display font-semibold tracking-wide">Mira cómo funciona</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight leading-[1.1] text-glow">
            Una llamada real con <span className="text-gradient text-glow-teal">ARIA en 47 segundos</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg font-light">
            Sin filtros. Así suena tu recepcionista IA atendiendo una cita.
          </p>
        </motion.div>

        <div className="bg-card/40 rounded-2xl border border-border/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-teal/[0.08] via-card/60 to-card/40 border-b border-border/20 px-5 py-3 flex items-center gap-3">
            <img src={agentInbound} alt="ARIA" className="w-8 h-8 object-contain" loading="lazy" />
            <div className="flex-1">
              <span className="text-sm font-display font-bold text-brand-teal">ARIA</span>
              <span className="text-[10px] text-muted-foreground ml-2">Simulación de llamada real</span>
            </div>
            {isPlaying && (
              <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-[3px] bg-brand-teal rounded-full animate-pulse" style={{ height: 8 + Math.random() * 12, animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            )}
          </div>

          {/* Chat area */}
          <div className="p-5 min-h-[300px] max-h-[450px] overflow-y-auto space-y-3">
            {!isPlaying && step === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Phone className="w-12 h-12 text-brand-teal/30 mb-4" />
                <p className="text-sm text-muted-foreground mb-6">Pulsa play para ver la simulación</p>
                <Button onClick={handleStart} className="rounded-full px-6" style={{ background: "linear-gradient(135deg, hsl(190 60% 50%), hsl(190 60% 42%))" }}>
                  <Play className="w-4 h-4 mr-2" /> Ver simulación
                </Button>
              </div>
            )}

            <AnimatePresence>
              {visibleMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "client" ? "justify-end" : msg.role === "system" ? "justify-center" : "justify-start"}`}
                >
                  {msg.role === "system" ? (
                    <div className="bg-secondary/40 rounded-lg px-3 py-1.5 flex items-center gap-2">
                      {i === 0 ? <Phone className="w-3 h-3 text-brand-teal" /> : <CheckCircle2 className="w-3 h-3 text-brand-emerald" />}
                      <span className="text-[11px] text-muted-foreground">{msg.text}</span>
                    </div>
                  ) : msg.role === "aria" ? (
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <img src={agentInbound} alt="" className="w-6 h-6 object-contain rounded-full shrink-0 mt-1" />
                      <div className="bg-brand-teal/10 border border-brand-teal/15 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                        <p className="text-sm text-foreground/90 leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[80%]">
                      <div className="bg-secondary/60 border border-border/20 rounded-2xl rounded-tr-sm px-3.5 py-2.5">
                        <p className="text-sm text-foreground/80 leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && isPlaying && step < conversation.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex ${conversation[step]?.role === "client" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-center gap-1 px-4 py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              </motion.div>
            )}

            {!isPlaying && step >= conversation.length && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center pt-4">
                <Button variant="outline" size="sm" onClick={handleStart} className="rounded-full text-sm border-border/40">
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Repetir simulación
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallSimulator;
