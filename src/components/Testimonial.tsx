import { useRef, useEffect, useState } from "react";
import { Star, Quote, ArrowRight, TrendingUp } from "lucide-react";
import agentSupport from "@/assets/characters/agent-support.png";

const testimonials = [
  {
    quote:
      "Contratamos a 3 equipos distintos para encontrar al mejor, y el equipo de CALLA destacó por encima de todos. Mientras los otros 2 fallaron en entregar resultados reales, ellos nos generaron más de $300K en nuevos ingresos.",
    name: "Tim Michael Bissonnette",
    role: "CEO",
    company: "Direct Public Funding",
    initials: "TB",
    result: "$300K+ en ingresos",
  },
  {
    quote:
      "Fue un placer trabajar con el equipo de CALLA. Son expertos en su campo. Me dieron una guía clara y me ayudaron a ejecutar una campaña muy exitosa desde el primer día.",
    name: "Carin Cowell",
    role: "Marketing Manager",
    company: "Reputation Loop",
    initials: "CC",
    result: "Campaña exitosa",
  },
  {
    quote:
      "Realmente disfrutamos trabajar con vosotros. Habéis sido geniales, y realmente sabéis lo que hacéis, lo cual es refrescante... Muy refrescante.",
    name: "Larry Fendrich",
    role: "Fundador",
    company: "Dental 101",
    initials: "LF",
    result: "200+ leads/mes",
  },
  {
    quote:
      "Son comunicadores excepcionales, proporcionando explicaciones detalladas y exhaustivas de la metodología detrás de su estrategia. Atención al detalle impecable.",
    name: "Tim Virga",
    role: "Director",
    company: "Capify",
    initials: "TV",
    result: "ROI excepcional",
  },
];

const caseStudies = [
  {
    company: "Tutor Doctor",
    result: "$5,000",
    description: "en ventas la primera semana",
    metric: "25 leads cualificados a $30/lead",
  },
  {
    company: "Rehab System",
    result: "$400K",
    description: "en capital de inversión",
    metric: "Leads cualificados de inversores acreditados",
  },
  {
    company: "Advanced Plumbing",
    result: "$7,200",
    description: "en ventas en 14 días",
    metric: "Leads a $6 y citas a $26",
  },
  {
    company: "Flooring Company",
    result: "$18K",
    description: "en ventas el primer mes",
    metric: "Miles de leads y cientos de presupuestos",
  },
];

const FadeInCard = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

const Testimonial = () => {
  return (
    <section id="testimonials" className="py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-brand-rose/[0.03] blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-brand-teal/[0.03] blur-[100px]" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary/80 font-display text-sm tracking-[0.2em] uppercase mb-3 font-medium">
            Resultados reales
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
            Lo que dicen <span className="text-gradient">nuestros clientes</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Más de 20 industrias, cientos de campañas exitosas. Estos son algunos de los resultados que nuestro equipo ha conseguido.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <FadeInCard key={i} delay={i * 120}>
              <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:glow-box transition-all duration-500 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4 shrink-0" />

                {/* Quote text */}
                <blockquote className="text-sm md:text-base text-foreground/90 leading-relaxed mb-6 flex-1 font-light italic">
                  "{t.quote}"
                </blockquote>

                {/* Author + Result */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-lavender/30 to-brand-teal/30 flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-foreground text-xs">
                        {t.initials}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {t.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.role}, {t.company}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className="h-3 w-3 fill-brand-amber text-brand-amber"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-primary font-semibold">
                      {t.result}
                    </span>
                  </div>
                </div>
              </div>
            </FadeInCard>
          ))}
        </div>

        {/* Case Studies / Proven Results */}
        <FadeInCard delay={0}>
          <div className="glass-warm rounded-2xl p-8 md:p-10 relative overflow-hidden">
            {/* CARE robot peeking */}
            <div className="absolute -bottom-2 right-6 md:right-10 hidden md:block">
              <img
                src={agentSupport}
                alt=""
                className="w-20 object-contain opacity-20"
                width={512}
                height={512}
                loading="lazy"
              />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-lg text-foreground">
                Resultados probados en +20 industrias
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {caseStudies.map((cs, i) => (
                <div key={i} className="group/card">
                  <div className="text-2xl md:text-3xl font-display font-bold text-gradient mb-1">
                    {cs.result}
                  </div>
                  <div className="text-sm text-foreground font-medium mb-1">
                    {cs.description}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {cs.company} · {cs.metric}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/20 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                Datos verificados de campañas reales
              </span>
              <span className="flex items-center gap-1.5">
                <ArrowRight className="h-3 w-3 text-primary" />
                Resultados varían según industria y mercado
              </span>
            </div>
          </div>
        </FadeInCard>
      </div>
    </section>
  );
};

export default Testimonial;
