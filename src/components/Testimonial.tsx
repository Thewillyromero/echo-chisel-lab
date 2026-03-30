import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, ArrowRight, TrendingUp, Building2, CheckCircle2, ShieldCheck } from "lucide-react";
import agentSupport from "@/assets/characters/agent-support.webp";
import CharacterReveal from "@/components/CharacterReveal";
import logoReputationLoop from "@/assets/logos/reputation-loop.webp";
import logoTutorDoctor from "@/assets/logos/tutor-doctor.webp";
import logoRehabSystem from "@/assets/logos/rehab-system.webp";
import logoMonitronics from "@/assets/logos/monitronics.webp";

/** Trustpilot-style star: green square with white star inside */
const TrustpilotStar = ({ size = 20, filled = true }: { size?: number; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" rx="2" fill={filled ? "#00b67a" : "#dcdce6"} />
    <path
      d="M10 3.5l1.95 4.1 4.35.6-3.15 3.05.75 4.35L10 13.35 6.1 15.6l.75-4.35L3.7 8.2l4.35-.6L10 3.5z"
      fill="#fff"
      fillOpacity={filled ? 1 : 0.3}
    />
  </svg>
);

const TrustpilotStars = ({ rating = 5, size = 20 }: { rating?: number; size?: number }) => {
  const fullStars = Math.floor(rating);
  const hasPartial = rating % 1 > 0;
  return (
    <div className="flex items-center" style={{ gap: '2px' }}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <TrustpilotStar key={i} size={size} filled />;
        if (i === fullStars && hasPartial) {
          return (
            <div key={i} className="relative" style={{ width: size, height: size }}>
              <TrustpilotStar size={size} filled={false} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                <TrustpilotStar size={size} filled />
              </div>
            </div>
          );
        }
        return <TrustpilotStar key={i} size={size} filled={false} />;
      })}
    </div>
  );
};

const testimonials = [
  {
    quote: "Contratamos a 3 equipos distintos para encontrar al mejor, y Guillermo destacó por encima de todos. Nos generaron más de $300K en nuevos ingresos.",
    name: "Tim Michael Bissonnette",
    role: "CEO",
    company: "Direct Public Funding",
    initials: "TB",
    result: "$300K+ generados",
    logo: null,
    context: "Finanzas",
  },
  {
    quote: "Fue un placer trabajar con Guillermo y su equipo. Son expertos en su campo. Me ayudaron a ejecutar una campaña muy exitosa desde el primer día.",
    name: "Carin Cowell",
    role: "Marketing Manager",
    company: "Reputation Loop",
    initials: "CC",
    result: "Campaña exitosa desde día 1",
    logo: logoReputationLoop,
    context: "Lead Generation",
  },
  {
    quote: "El sistema que nos implementaron genera más de 200 leads al mes y citas consistentes para procedimientos de alto valor.",
    name: "Dr. Laurence Fendrich",
    role: "Fundador",
    company: "Dental 101",
    initials: "LF",
    result: "200+ leads/mes",
    logo: null,
    context: "Salud dental",
  },
  {
    quote: "Son comunicadores excepcionales, proporcionando explicaciones detalladas de la metodología. Decir que prestan atención al detalle sería quedarse corto.",
    name: "Tim Virga",
    role: "Director",
    company: "Capify",
    initials: "TV",
    result: "ROI excepcional",
    logo: null,
    context: "Fintech",
  },
  {
    quote: "En 14 días ya habíamos generado $7,200 en nuevos clientes con un coste por lead de solo $6.",
    name: "Michael Torres",
    role: "Propietario",
    company: "Advanced Plumbing",
    initials: "MT",
    result: "$7.2K en 14 días",
    logo: null,
    context: "Servicios",
  },
  {
    quote: "En la primera semana cerramos aproximadamente $5,000 en ventas solo con los leads que nos generaron. ROI positivo inmediatamente.",
    name: "Director Regional",
    role: "Franquiciado",
    company: "Tutor Doctor",
    initials: "TD",
    result: "$5K primera semana",
    logo: logoTutorDoctor,
    context: "Educación",
  },
];

const caseStudies = [
  { company: "Tutor Doctor", logo: logoTutorDoctor, result: "$5,000", description: "en ventas primera semana", metric: "25 leads a $30/lead", detail: "Leads reducidos a $13.28 en segunda fase" },
  { company: "Rehab System", logo: logoRehabSystem, result: "$400K", description: "en capital captado", metric: "Inversores acreditados a <$15", detail: "Estrategia de pre-framing y retargeting" },
  { company: "Advanced Plumbing", logo: null, result: "$7,200", description: "en ventas en 14 días", metric: "Leads a $6 · Citas a $26", detail: "Posicionamiento en cuidado preventivo" },
  { company: "Empresa de Suelos", logo: null, result: "$18K", description: "en ventas el primer mes", metric: "Presupuestos a $10.53", detail: "Leads desde $0.93" },
  { company: "Monitronics", logo: logoMonitronics, result: "$6", description: "por lead cualificado", metric: "Citas agendadas por $26", detail: "Sector seguridad · Appointment setting" },
  { company: "Debt Relief", logo: null, result: "<$10", description: "por lead cualificado", metric: "Citas a $27-$35", detail: "Cientos de leads generados" },
];

const avatarGradients = [
  "from-brand-teal/40 to-brand-emerald/30",
  "from-brand-lavender/40 to-primary/30",
  "from-brand-rose/40 to-brand-amber/30",
  "from-brand-amber/40 to-brand-teal/30",
  "from-brand-emerald/40 to-brand-lavender/30",
  "from-primary/40 to-brand-rose/30",
];

const cardVariants = (i: number, fromLeft: boolean) => ({
  hidden: { opacity: 0, y: 30, x: fromLeft ? -40 : 40 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const Testimonial = () => {
  const [expanded, setExpanded] = useState(false);
  const visibleTestimonials = expanded ? testimonials : testimonials.slice(0, 3);
  const visibleCaseStudies = expanded ? caseStudies : caseStudies.slice(0, 3);

  return (
    <section id="testimonials" className="py-16 md:py-28 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      {/* Background character — CARE with reveal */}
      <div className="absolute -right-10 top-1/4 pointer-events-none select-none hidden lg:block">
        <CharacterReveal
          src={agentSupport}
          alt=""
          className="w-[300px] md:w-[450px] opacity-[0.12]"
          glowColor="hsl(340 55% 60%)"
          revealOffset={[0.05, 0.3]}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
            Resultados reales
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 md:mb-5 tracking-tight text-glow">
            Lo que dicen <span className="text-gradient text-glow-teal">nuestros clientes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg font-light mb-8 md:mb-10">
            Más de 20 industrias, cientos de campañas exitosas.
          </p>

          {/* Trustpilot-style rating badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-4">
            {[
              { label: "Google Reviews", rating: 4.9 },
              { label: "Trustpilot", rating: 4.8 },
              { label: "Clutch.co", rating: 5.0 },
            ].map((badge) => (
              <div key={badge.label} className="bg-card/50 rounded-xl border border-border/30 px-3.5 md:px-5 py-2.5 md:py-3 flex items-center gap-2.5 md:gap-3 hover:border-border/50 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold text-foreground">{badge.rating}</span>
                    <TrustpilotStars rating={badge.rating} size={14} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{badge.label}</span>
                </div>
              </div>
            ))}
            {/* Verified badge */}
            <div className="bg-card/50 rounded-xl border border-border/30 px-3.5 md:px-5 py-2.5 md:py-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" style={{ color: '#00b67a' }} />
              <div>
                <span className="text-xs font-semibold text-foreground block leading-tight">Verificado</span>
                <span className="text-[10px] text-muted-foreground">Opiniones reales</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative mb-12 md:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.12 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {visibleTestimonials.map((t, i) => {
              const fromLeft = i % 2 === 0;
              return (
                <motion.div key={i} variants={cardVariants(i, fromLeft)}>
                  <div className="bg-card/40 rounded-2xl border border-border/30 p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col group">
                    {/* Stars row */}
                    <div className="flex items-center justify-between mb-4">
                      <TrustpilotStars rating={5} size={18} />
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors" style={{ color: '#00b67a40' }} />
                    </div>

                    {/* Quote */}
                    <blockquote className="text-sm text-foreground/85 leading-relaxed mb-5 flex-1 font-light">
                      <Quote className="inline h-3.5 w-3.5 text-primary/25 mr-1 -mt-1" />
                      {t.quote}
                    </blockquote>

                    {/* Result badge */}
                    <div className="mb-4">
                      <span
                        className="text-[11px] font-display font-bold tracking-wide px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: 'hsl(160 50% 48% / 0.12)', color: 'hsl(160 50% 60%)' }}
                      >
                        {t.result}
                      </span>
                    </div>

                    {/* Separator */}
                    <div className="h-px bg-border/20 mb-4" />

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      {t.logo ? (
                        <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center overflow-hidden p-1 ring-1 ring-border/20">
                          <img loading="lazy" src={t.logo} alt={t.company} className="w-full h-full object-contain rounded-full" />
                        </div>
                      ) : (
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center ring-1 ring-border/20`}>
                          <span className="font-display font-bold text-foreground text-xs">{t.initials}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{t.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{t.role}, {t.company}</div>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground/40 bg-secondary/40 px-2 py-0.5 rounded-full shrink-0">
                        {t.context}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Fade overlay when collapsed */}
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          )}
        </div>

        {/* Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <div className="bg-card/40 rounded-2xl border border-border/30 p-5 md:p-10 relative overflow-hidden">
            <div className="absolute -bottom-4 right-8 hidden md:block">
              <img src={agentSupport} alt="" className="w-24 object-contain opacity-15" width={512} height={512} loading="lazy" />
            </div>
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-lg text-foreground">Resultados probados en +20 industrias</h3>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.12 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10"
            >
              {visibleCaseStudies.map((cs, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants(i, i % 2 === 0)}
                  className="bg-secondary/30 rounded-xl border border-border/20 p-4 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {cs.logo ? (
                      <img loading="lazy" src={cs.logo} alt={cs.company} className="h-5 w-5 object-contain rounded-sm" />
                    ) : (
                      <Building2 className="h-4 w-4 text-muted-foreground/40" />
                    )}
                    <span className="text-xs text-muted-foreground font-medium">{cs.company}</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground mb-1">{cs.result}</div>
                  <div className="text-sm text-foreground/70 font-medium mb-1">{cs.description}</div>
                  <div className="text-xs text-muted-foreground mb-1">{cs.metric}</div>
                  <div className="text-[10px] text-muted-foreground/40 italic">{cs.detail}</div>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-8 pt-6 border-t border-border/20 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                Datos verificados
              </span>
              <span className="flex items-center gap-1.5">
                <ArrowRight className="h-3 w-3 text-primary" />
                Campañas gestionadas por Guillermo y equipo
              </span>
            </div>
          </div>
        </motion.div>

        {/* Expand/Collapse bar */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-3 bg-card/80 backdrop-blur-md border border-border/30 rounded-full px-6 py-3 hover:border-border/50 transition-all duration-300 group"
          >
            <div className="flex -space-x-2">
              {["TB", "CC", "LF", "TV", "MT"].map((initials, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-teal/40 to-brand-emerald/30 flex items-center justify-center ring-2 ring-background text-[9px] font-bold text-foreground/70"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-sm text-foreground/70 font-medium">
              +200 empresas confían en CALLA
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
              {expanded ? "Ver menos" : "Ver más"}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
