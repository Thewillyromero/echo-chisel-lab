import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroRobot from "@/assets/hero-robot.png";

const COUNTDOWN_SECONDS = 30;

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

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
      const message = err instanceof Error ? err.message : "Error al solicitar la demo.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [form]);

  const handleReset = () => {
    setSubmitted(false);
    setCountdown(COUNTDOWN_SECONDS);
    setForm({ name: "", phone: "" });
  };

  const progress = ((COUNTDOWN_SECONDS - countdown) / COUNTDOWN_SECONDS) * 100;
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <section id="demo" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] rounded-full bg-brand-emerald/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-brand-emerald/[0.08] border border-brand-emerald/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-emerald" />
            <span className="text-xs text-brand-emerald font-medium">Prueba en vivo</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight">
            Escucha a <span className="text-gradient">CALLA en acción</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
            Introduce tu nombre y número de teléfono. Recibirás una llamada de demo de nuestro asistente IA en segundos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="max-w-xl mx-auto"
        >
          <div className="relative rounded-3xl border border-border/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-emerald/[0.04] via-card/80 to-primary/[0.03]" />

            <div className="relative p-8 md:p-10">
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
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center shrink-0">
                        <Phone className="h-6 w-6 text-brand-emerald" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-foreground">Demo gratuita</h3>
                        <p className="text-sm text-muted-foreground font-light">Te llamamos ahora mismo</p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="demo-name" className="text-sm text-foreground/80">
                        <User className="inline h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        Tu nombre
                      </Label>
                      <Input
                        id="demo-name"
                        placeholder="Ej: Carlos García"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        maxLength={100}
                        required
                        className="bg-secondary/50 border-border/40 h-12 text-base"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="demo-phone" className="text-sm text-foreground/80">
                        <Phone className="inline h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        Tu teléfono
                      </Label>
                      <Input
                        id="demo-phone"
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        maxLength={20}
                        required
                        className="bg-secondary/50 border-border/40 h-12 text-base"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full bg-brand-emerald hover:bg-brand-emerald/90 text-primary-foreground rounded-full text-base h-12 shadow-lg shadow-brand-emerald/20 font-semibold"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Phone className="mr-2 h-5 w-5" />
                          Recibir llamada demo
                        </>
                      )}
                    </Button>

                    <p className="text-[11px] text-muted-foreground/40 text-center leading-relaxed">
                      Sin compromiso · Llamada gratuita · Solo España y Latinoamérica
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="countdown"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    {/* Countdown ring */}
                    <div className="relative w-32 h-32 mb-6">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        {/* Background ring */}
                        <circle
                          cx="60"
                          cy="60"
                          r="52"
                          fill="none"
                          stroke="hsl(var(--border))"
                          strokeWidth="4"
                          opacity="0.3"
                        />
                        {/* Progress ring */}
                        <circle
                          cx="60"
                          cy="60"
                          r="52"
                          fill="none"
                          stroke="hsl(var(--brand-emerald))"
                          strokeWidth="4"
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
                              segundos
                            </span>
                          </>
                        ) : (
                          <CheckCircle className="h-10 w-10 text-brand-emerald" />
                        )}
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-display font-bold text-xl mb-2 text-foreground">
                        {countdown > 0 ? "Preparando tu llamada..." : "¡Llamada en camino!"}
                      </h3>
                      <p className="text-muted-foreground font-light mb-2">
                        {countdown > 0
                          ? `${form.name}, ARIA te llamará al ${form.phone} en breve.`
                          : `${form.name}, deberías estar recibiendo la llamada ahora.`
                        }
                      </p>
                      <p className="text-sm text-muted-foreground/50 mb-6">
                        Mantén tu teléfono cerca
                      </p>
                    </motion.div>

                    <img
                      src={heroRobot}
                      alt="ARIA llamando"
                      className="w-20 opacity-30 animate-float mb-6"
                      width={1024}
                      height={1024}
                    />

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
        </motion.div>
      </div>
    </section>
  );
};

export default DemoCall;
