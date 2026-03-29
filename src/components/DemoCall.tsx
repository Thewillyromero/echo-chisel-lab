import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, Loader2, CheckCircle, Sparkles, Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import agentInbound from "@/assets/characters/agent-inbound.png";

const COUNTDOWN_SECONDS = 30;

/* Simulated waveform bars */
const WaveformBars = ({ active }: { active: boolean }) => (
  <div className="flex items-end gap-[3px] h-8">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full bg-brand-teal"
        animate={
          active
            ? {
                height: [8, 14 + Math.random() * 18, 8],
                opacity: [0.4, 0.9, 0.4],
              }
            : { height: 6, opacity: 0.15 }
        }
        transition={
          active
            ? {
                duration: 0.4 + Math.random() * 0.4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.05,
              }
            : { duration: 0.3 }
        }
      />
    ))}
  </div>
);

const DemoCall = () => {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (!submitted) return;
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, countdown]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const name = form.name.trim();
      const phone = form.phone.trim();

      if (!name || name.length < 2) {
        toast.error("Introduce tu nombre (mín. 2 caracteres).");
        return;
      }

      const phoneRegex = /^\+?[\d\s\-().]{7,20}$/;
      if (!phone || !phoneRegex.test(phone)) {
        toast.error("Introduce un número de teléfono válido.");
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("demo-call", {
          body: { name, phone },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        setSubmitted(true);
        setCountdown(COUNTDOWN_SECONDS);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Error al solicitar la demo.";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  const handleReset = () => {
    setSubmitted(false);
    setCountdown(COUNTDOWN_SECONDS);
    setForm({ name: "", phone: "" });
  };

  const progress =
    ((COUNTDOWN_SECONDS - countdown) / COUNTDOWN_SECONDS) * 100;
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <section
      id="demo"
      className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      {/* Rich ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-brand-teal/[0.04] blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left side — text + social proof */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-teal/[0.08] border border-brand-teal/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
              <span className="text-xs text-brand-teal font-display font-semibold tracking-wide">
                Prueba en vivo
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-5 tracking-tight leading-[1.1]">
              Escucha a{" "}
              <span className="text-gradient">ARIA en acción</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-8 max-w-lg">
              Introduce tu nombre y número. En segundos recibirás una
              llamada real de nuestra asistente IA. Sin compromiso,
              sin coste.
            </p>

            {/* What you'll experience */}
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Phone,
                  text: "Llamada real a tu teléfono en menos de 30 segundos",
                },
                {
                  icon: Mic,
                  text: "Voz natural en español — no suena a robot",
                },
                {
                  icon: Volume2,
                  text: "Conversación real: pregunta lo que quieras",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-teal/10 border border-brand-teal/15 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-brand-teal" />
                  </div>
                  <span className="text-sm text-foreground/80">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Mini social proof */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground/50">
              <div className="flex -space-x-2">
                {[
                  "bg-brand-teal/30",
                  "bg-brand-lavender/30",
                  "bg-brand-emerald/30",
                  "bg-brand-amber/30",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full ${bg} border-2 border-background`}
                  />
                ))}
              </div>
              <span>+500 demos realizadas este mes</span>
            </div>
          </motion.div>

          {/* Right side — form card with phone mockup feel */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-brand-teal/[0.06] to-transparent blur-2xl pointer-events-none" />

              <div className="relative rounded-3xl border border-border/30 overflow-hidden backdrop-blur-sm">
                {/* Card header with agent */}
                <div className="bg-gradient-to-r from-brand-teal/[0.08] via-card/60 to-card/40 border-b border-border/20 px-6 py-4 flex items-center gap-4">
                  <motion.img
                    src={agentInbound}
                    alt="ARIA"
                    className="w-12 h-12 object-contain drop-shadow-lg"
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    width={512}
                    height={512}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-display font-bold text-brand-teal">
                        ARIA
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-emerald-400 font-medium">
                        Online
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Asistente de llamadas entrantes
                    </p>
                  </div>
                  <WaveformBars active={submitted && countdown > 0} />
                </div>

                {/* Card body */}
                <div className="relative p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {!submitted ? (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="demo-name"
                            className="text-sm text-foreground/80 font-medium"
                          >
                            <User className="inline h-3.5 w-3.5 mr-1.5 text-muted-foreground/60" />
                            Tu nombre
                          </Label>
                          <Input
                            id="demo-name"
                            placeholder="Ej: Carlos García"
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            maxLength={100}
                            required
                            className="bg-secondary/40 border-border/30 h-12 text-base rounded-xl focus:border-brand-teal/50 focus:ring-brand-teal/20 transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label
                            htmlFor="demo-phone"
                            className="text-sm text-foreground/80 font-medium"
                          >
                            <Phone className="inline h-3.5 w-3.5 mr-1.5 text-muted-foreground/60" />
                            Tu teléfono
                          </Label>
                          <Input
                            id="demo-phone"
                            type="tel"
                            placeholder="+34 600 000 000"
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                            maxLength={20}
                            required
                            className="bg-secondary/40 border-border/30 h-12 text-base rounded-xl focus:border-brand-teal/50 focus:ring-brand-teal/20 transition-colors"
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={loading}
                          className="w-full rounded-xl text-base h-13 font-display font-semibold shadow-lg shadow-brand-teal/20 transition-all duration-300 hover:shadow-brand-teal/30 hover:scale-[1.01]"
                          style={{
                            background:
                              "linear-gradient(135deg, hsl(190 60% 50%), hsl(190 60% 42%))",
                          }}
                        >
                          {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <>
                              <Phone className="mr-2 h-5 w-5" />
                              Recibir llamada ahora
                            </>
                          )}
                        </Button>

                        <p className="text-[11px] text-muted-foreground/35 text-center leading-relaxed">
                          Sin compromiso · Gratis · España y Latinoamérica
                        </p>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="countdown"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex flex-col items-center text-center py-2"
                      >
                        {/* Countdown ring */}
                        <div className="relative w-28 h-28 mb-5">
                          <svg
                            className="w-full h-full -rotate-90"
                            viewBox="0 0 120 120"
                          >
                            <circle
                              cx="60"
                              cy="60"
                              r="52"
                              fill="none"
                              stroke="hsl(var(--border))"
                              strokeWidth="3"
                              opacity="0.2"
                            />
                            <circle
                              cx="60"
                              cy="60"
                              r="52"
                              fill="none"
                              stroke="hsl(var(--brand-teal))"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                              className="transition-all duration-1000 ease-linear"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {countdown > 0 ? (
                              <>
                                <span className="text-3xl font-display font-extrabold text-foreground">
                                  {countdown}
                                </span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                  seg
                                </span>
                              </>
                            ) : (
                              <CheckCircle className="h-9 w-9 text-brand-teal" />
                            )}
                          </div>
                        </div>

                        <h3 className="font-display font-bold text-lg mb-2 text-foreground">
                          {countdown > 0
                            ? "ARIA te está llamando..."
                            : "¡Llamada en camino!"}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light mb-1">
                          {countdown > 0
                            ? `${form.name}, recibirás la llamada en tu ${form.phone}`
                            : `${form.name}, deberías estar recibiendo la llamada.`}
                        </p>
                        <p className="text-xs text-muted-foreground/40 mb-6">
                          Mantén tu teléfono cerca
                        </p>

                        {countdown === 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleReset}
                              className="rounded-full text-sm border-border/40"
                            >
                              Solicitar otra demo
                            </Button>
                          </motion.div>
                        )}
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
