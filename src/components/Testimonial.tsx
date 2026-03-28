import { useRef, useEffect, useState } from "react";
import { Star, Quote, ArrowRight, TrendingUp, Building2 } from "lucide-react";
import agentSupport from "@/assets/characters/agent-support.png";
import logoReputationLoop from "@/assets/logos/reputation-loop.jpg";
import logoTutorDoctor from "@/assets/logos/tutor-doctor.jpg";
import logoRehabSystem from "@/assets/logos/rehab-system.jpg";
import logoMonitronics from "@/assets/logos/monitronics.jpg";
import logoMcKenzie from "@/assets/logos/mckenzie-law.jpg";
import logoRedRoot from "@/assets/logos/redroot.jpg";

const testimonials = [
  {
    quote:
      "Contratamos a 3 equipos distintos para encontrar al mejor, y el equipo de Guillermo destacó por encima de todos. Mientras los otros 2 fallaron en entregar resultados reales, nos generaron más de $300K en nuevos ingresos con una estrategia impecable.",
    name: "Tim Michael Bissonnette",
    role: "CEO",
    company: "Direct Public Funding",
    initials: "TB",
    result: "$300K+ generados",
    logo: null,
    context: "Sector financiero · Captación de inversión",
  },
  {
    quote:
      "Fue un placer trabajar con Guillermo y su equipo. Son expertos en su campo. Me dieron una guía clara y me ayudaron a ejecutar una campaña muy exitosa desde el primer día. La comunicación fue excelente en todo momento.",
    name: "Carin Cowell",
    role: "Marketing Manager",
    company: "Reputation Loop",
    initials: "CC",
    result: "Campaña exitosa",
    logo: logoReputationLoop,
    context: "Sector marketing · Generación de leads",
  },
  {
    quote:
      "Realmente disfrutamos trabajar con vosotros. Habéis sido geniales, y realmente sabéis lo que hacéis, lo cual es refrescante... Muy refrescante. El sistema que nos implementaron genera más de 200 leads al mes y citas consistentes para procedimientos dentales de alto valor.",
    name: "Dr. Laurence Fendrich",
    role: "Fundador & Dentista",
    company: "Dental 101",
    initials: "LF",
    result: "200+ leads/mes",
    logo: null,
    context: "Sector salud dental · Citas de alto valor",
  },
  {
    quote:
      "Son comunicadores excepcionales, proporcionando explicaciones detalladas y exhaustivas de la metodología detrás de su estrategia. Decir que prestan atención al detalle sería quedarse corto.",
    name: "Tim Virga",
    role: "Director",
    company: "Capify",
    initials: "TV",
    result: "ROI excepcional",
    logo: null,
    context: "Sector fintech · Préstamos comerciales",
  },
  {
    quote:
      "El equipo de Guillermo desarrolló un posicionamiento totalmente nuevo para nuestro negocio que transformó nuestras ventas. En 14 días ya habíamos generado $7,200 en nuevos clientes con un coste por lead de solo $6.",
    name: "Michael Torres",
    role: "Propietario",
    company: "Advanced Plumbing Systems",
    initials: "MT",
    result: "$7.2K en 14 días",
    logo: null,
    context: "Sector servicios · Fontanería",
  },
  {
    quote:
      "En la primera semana cerramos aproximadamente $5,000 en ventas solo con los leads que nos generaron. Cubrimos completamente la inversión y obtuvimos un ROI positivo inmediatamente. Impresionante.",
    name: "Director Regional",
    role: "Franquiciado",
    company: "Tutor Doctor",
    initials: "TD",
    result: "$5K primera semana",
    logo: logoTutorDoctor,
    context: "Sector educación · Tutorías a domicilio",
  },
];

const caseStudies = [
  {
    company: "Tutor Doctor",
    logo: logoTutorDoctor,
    result: "$5,000",
    description: "en ventas la primera semana",
    metric: "25 leads a $30/lead · 25% tasa de cierre",
    detail: "Leads reducidos de $30 a $13.28 en segunda fase",
  },
  {
    company: "Rehab System",
    logo: logoRehabSystem,
    result: "$400K",
    description: "en capital de inversión captado",
    metric: "Leads de inversores acreditados a <$15",
    detail: "Estrategia de pre-framing y retargeting inventada",
  },
  {
    company: "Advanced Plumbing",
    logo: null,
    result: "$7,200",
    description: "en ventas en solo 14 días",
    metric: "Leads a $6 · Citas a $26",
    detail: "Nuevo posicionamiento en cuidado preventivo",
  },
  {
    company: "Empresa de Suelos",
    logo: null,
    result: "$18K",
    description: "en ventas el primer mes",
    metric: "Miles de leads · Cientos de presupuestos",
    detail: "Leads desde $0.93 · Presupuestos a $10.53",
  },
  {
    company: "Monitronics Security",
    logo: logoMonitronics,
    result: "$6",
    description: "por lead cualificado",
    metric: "Citas agendadas por $26",
    detail: "Sector seguridad · Campañas de appointment setting",
  },
  {
    company: "Debt Relief Service",
    logo: null,
    result: "<$10",
    description: "por lead cualificado",
    metric: "Citas agendadas por $27-$35",
    detail: "Cientos de leads cualificados generados",
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
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Más de 20 industrias, cientos de campañas exitosas. Resultados reales conseguidos por Guillermo y el equipo de CALLA.
          </p>

          {/* External Review Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Google Reviews */}
            <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 hover:glow-box transition-all duration-300">
              <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-foreground">4.9</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-brand-amber text-brand-amber" />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">Google Reviews</span>
              </div>
            </div>

            {/* Trustpilot */}
            <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 hover:glow-box transition-all duration-300">
              <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" fill="#00B67A"/>
              </svg>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-foreground">4.8</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-brand-emerald text-brand-emerald" />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">Trustpilot</span>
              </div>
            </div>

            {/* Clutch */}
            <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 hover:glow-box transition-all duration-300">
              <div className="h-6 w-6 rounded-full bg-[#EF4335] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-[10px]">C</span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-foreground">5.0</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-brand-rose text-brand-rose" />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">Clutch.co</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <FadeInCard key={i} delay={i * 100}>
              <div className="glass rounded-2xl p-6 relative overflow-hidden group hover:glow-box transition-all duration-500 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="h-6 w-6 text-primary/20 mb-3 shrink-0" />

                {/* Quote text */}
                <blockquote className="text-sm text-foreground/90 leading-relaxed mb-5 flex-1 font-light italic">
                  "{t.quote}"
                </blockquote>

                {/* Context badge */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 bg-secondary/50 px-2 py-1 rounded-full">
                    {t.context}
                  </span>
                </div>

                {/* Author + Result */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/20">
                  <div className="flex items-center gap-3">
                    {t.logo ? (
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 overflow-hidden p-1">
                        <img
                          src={t.logo}
                          alt={t.company}
                          className="w-full h-full object-contain rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-lavender/30 to-brand-teal/30 flex items-center justify-center shrink-0">
                        <span className="font-display font-bold text-foreground text-xs">
                          {t.initials}
                        </span>
                      </div>
                    )}
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
                    <div className="flex items-center gap-0.5 justify-end">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className="h-2.5 w-2.5 fill-brand-amber text-brand-amber"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-primary font-semibold">
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

            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-lg text-foreground">
                Resultados probados en +20 industrias
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {caseStudies.map((cs, i) => (
                <div key={i} className="glass rounded-xl p-4 group/card hover:glow-box transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    {cs.logo ? (
                      <img
                        src={cs.logo}
                        alt={cs.company}
                        className="h-5 w-5 object-contain rounded-sm"
                      />
                    ) : (
                      <Building2 className="h-4 w-4 text-muted-foreground/50" />
                    )}
                    <span className="text-xs text-muted-foreground font-medium">
                      {cs.company}
                    </span>
                  </div>
                  <div className="text-2xl font-display font-bold text-gradient mb-1">
                    {cs.result}
                  </div>
                  <div className="text-sm text-foreground font-medium mb-1">
                    {cs.description}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {cs.metric}
                  </div>
                  <div className="text-[10px] text-muted-foreground/50 italic">
                    {cs.detail}
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
                Campañas gestionadas por Guillermo y equipo
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
