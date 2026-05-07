import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Building2, Users, TrendingUp, CheckCircle, Target, Zap, BarChart3, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import { FadeIn } from "@/hooks/useFadeInOnScroll";
import { BOOKING_URL } from "@/lib/constants";

const metrics = [
  { value: "200", suffix: " llamadas/día", label: "gestionadas", icon: Phone },
  { value: "3", suffix: " sedes", label: "unificadas", icon: Building2 },
  { value: "2", suffix: " puestos", label: "de recepción ahorrados", icon: Users },
  { value: "90", suffix: "%", label: "tasa de conexión", icon: TrendingUp },
];

const challenges = [
  "Edommo Energía gestiona proyectos de eficiencia energética en 3 sedes en España",
  "Alto volumen de llamadas (200+ diarias) que desbordaba al equipo de recepción",
  "Las llamadas perdidas significaban leads perdidos y proyectos retrasados",
  "Necesitaban una solución que derivara llamadas a la oficina correcta y agendara citas automáticamente",
];

const solutions = [
  { title: "ARIA (Inbound)", desc: "Desplegado para atender todas las llamadas entrantes 24/7" },
  { title: "Routing inteligente", desc: "Identifica la intención del llamante y conecta con la oficina correcta" },
  { title: "Agenda automática", desc: "Citas sincronizadas con los calendarios del equipo en tiempo real" },
  { title: "BYTE Analytics", desc: "Métricas de llamadas en tiempo real e insights accionables" },
];

const results = [
  { value: "100", suffix: "%", label: "de llamadas atendidas", before: "antes ~60%" },
  { value: "90", suffix: " min", label: "de conversación productiva en la primera semana", before: "" },
  { value: "2", suffix: " puestos", label: "de recepción reubicados a tareas de mayor valor", before: "" },
  { value: "ROI", suffix: "+", label: "positivo desde el primer mes", before: "" },
];

/* Animated counter */
const AnimatedNumber = ({ value, suffix }: { value: string; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isNumeric = /^\d+$/.test(value);

  if (!isNumeric) {
    return (
      <span ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-gradient">
        {isInView ? value : ""}{isInView ? suffix : ""}
      </span>
    );
  }

  return (
    <span ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-gradient">
      {isInView ? (
        <CountUp target={parseInt(value)} duration={1.5} />
      ) : "0"}
      {isInView ? suffix : ""}
    </span>
  );
};

const CountUp = ({ target, duration }: { target: number; duration: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration * 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [target, duration]);
  return <>{count}</>;
};

const CaseStudy = () => {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-amber/[0.04] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-brand-teal/[0.03] blur-[100px]" />

        <div className="container mx-auto relative z-10 max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <TrendingUp className="h-4 w-4 text-brand-amber" />
              <span className="text-xs font-display font-medium text-brand-amber uppercase tracking-[0.2em]">
                Caso de exito
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 tracking-tight leading-[1.1]">
              Como Edommo Energia{" "}
              <span className="text-gradient">automatizo su atencion telefonica</span>{" "}
              con CALLA
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light">
              De perder llamadas a gestionar 200 al dia entre 3 sedes — sin anadir personal
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="glass rounded-full px-3 py-1">Energia</span>
              <span className="glass rounded-full px-3 py-1">Marzo — Abril 2026</span>
              <span className="glass rounded-full px-3 py-1">Edommo Energia</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((m, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="glass rounded-2xl p-5 md:p-6 text-center hover:glow-box transition-all duration-300 group">
                  <m.icon className="h-6 w-6 text-primary mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="text-2xl md:text-3xl font-display font-bold text-gradient mb-1">
                    {m.value}{m.suffix}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">{m.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0}>
              <div className="glass-warm rounded-2xl p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="h-5 w-5 text-brand-rose" />
                  <h2 className="font-display font-bold text-lg text-foreground">
                    El desafio
                  </h2>
                </div>
                <ul className="space-y-4">
                  {challenges.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-rose/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-brand-rose">{i + 1}</span>
                      </span>
                      <span className="text-sm text-foreground/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="glass rounded-2xl p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="h-5 w-5 text-brand-emerald" />
                  <h2 className="font-display font-bold text-lg text-foreground">
                    La solucion CALLA
                  </h2>
                </div>
                <ul className="space-y-4">
                  {solutions.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-brand-emerald shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{s.title}</span>
                        <span className="text-sm text-foreground/70 ml-1">— {s.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Results — animated numbers */}
      <section className="py-20 px-5 md:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-3 font-semibold">Resultados</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
                Numeros que <span className="text-gradient">hablan solos</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6">
            {results.map((r, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="glass rounded-2xl p-8 text-center hover:glow-box transition-all duration-500">
                  <AnimatedNumber value={r.value} suffix={r.suffix} />
                  <div className="text-sm text-foreground/80 mt-3 font-medium">{r.label}</div>
                  {r.before && (
                    <div className="text-xs text-muted-foreground mt-1 italic">({r.before})</div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quote — Forbes-style */}
      <section className="py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <div className="relative">
              {/* Gold accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-brand-amber via-brand-amber/60 to-brand-amber/20" />

              <div className="pl-8 md:pl-12">
                <Quote className="h-8 w-8 text-brand-amber/40 mb-4" />
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed text-foreground/90 mb-8 italic">
                  &ldquo;Gestionamos 200 llamadas al dia entre 3 sedes. CALLA unifico todo: atiende, deriva a la sede correcta y agenda. Ahorramos 2 puestos de recepcion.&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-amber/40 to-brand-teal/30 flex items-center justify-center ring-2 ring-brand-amber/20">
                    <span className="font-display font-bold text-foreground text-sm">MS</span>
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground">Miguel Santos</div>
                    <div className="text-sm text-muted-foreground">Director de Operaciones, Edommo Energia</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="glass-warm rounded-2xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-brand-amber/[0.06] blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-primary/[0.04] blur-[60px]" />
              <div className="relative z-10">
                <BarChart3 className="h-8 w-8 text-brand-amber mx-auto mb-4" />
                <h2 className="text-2xl md:text-4xl font-display font-extrabold mb-4 tracking-tight">
                  Quieres resultados como{" "}
                  <span className="text-gradient">Edommo</span>?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Agenda una consulta gratuita y te mostramos como CALLA puede transformar tu atencion telefonica.
                </p>
                <Button
                  size="lg"
                  className="glow-box text-base px-8"
                  onClick={() => window.open(BOOKING_URL, "_blank")}
                >
                  Reservar consulta gratuita <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="case-study-edommo" />
    </div>
  );
};

export default CaseStudy;
