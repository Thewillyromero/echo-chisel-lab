import { motion } from "framer-motion";
import { Star, Quote, ArrowRight, TrendingUp, Building2 } from "lucide-react";
import agentSupport from "@/assets/characters/agent-support.png";
import logoReputationLoop from "@/assets/logos/reputation-loop.jpg";
import logoTutorDoctor from "@/assets/logos/tutor-doctor.jpg";
import logoRehabSystem from "@/assets/logos/rehab-system.jpg";
import logoMonitronics from "@/assets/logos/monitronics.jpg";

const testimonials = [
  {
    quote: "Contratamos a 3 equipos distintos para encontrar al mejor, y el equipo de Guillermo destacó por encima de todos. Nos generaron más de $300K en nuevos ingresos con una estrategia impecable.",
    name: "Tim Michael Bissonnette",
    role: "CEO",
    company: "Direct Public Funding",
    initials: "TB",
    result: "$300K+ generados",
    logo: null,
    context: "Sector financiero",
  },
  {
    quote: "Fue un placer trabajar con Guillermo y su equipo. Son expertos en su campo. Me ayudaron a ejecutar una campaña muy exitosa desde el primer día.",
    name: "Carin Cowell",
    role: "Marketing Manager",
    company: "Reputation Loop",
    initials: "CC",
    result: "Campaña exitosa",
    logo: logoReputationLoop,
    context: "Generación de leads",
  },
  {
    quote: "El sistema que nos implementaron genera más de 200 leads al mes y citas consistentes para procedimientos dentales de alto valor.",
    name: "Dr. Laurence Fendrich",
    role: "Fundador",
    company: "Dental 101",
    initials: "LF",
    result: "200+ leads/mes",
    logo: null,
    context: "Sector salud",
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
  { company: "Tutor Doctor", logo: logoTutorDoctor, result: "$5,000", description: "en ventas la primera semana", metric: "25 leads a $30/lead", detail: "Leads reducidos a $13.28 en segunda fase" },
  { company: "Rehab System", logo: logoRehabSystem, result: "$400K", description: "en capital captado", metric: "Inversores acreditados a <$15", detail: "Estrategia de pre-framing y retargeting" },
  { company: "Advanced Plumbing", logo: null, result: "$7,200", description: "en ventas en 14 días", metric: "Leads a $6 · Citas a $26", detail: "Posicionamiento en cuidado preventivo" },
  { company: "Empresa de Suelos", logo: null, result: "$18K", description: "en ventas el primer mes", metric: "Presupuestos a $10.53", detail: "Leads desde $0.93" },
  { company: "Monitronics", logo: logoMonitronics, result: "$6", description: "por lead cualificado", metric: "Citas agendadas por $26", detail: "Sector seguridad · Appointment setting" },
  { company: "Debt Relief", logo: null, result: "<$10", description: "por lead cualificado", metric: "Citas a $27-$35", detail: "Cientos de leads generados" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const Testimonial = () => {
  return (
    <section id="testimonials" className="py-16 md:py-28 px-5 md:px-6 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
            Resultados reales
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 md:mb-5 tracking-tight">
            Lo que dicen <span className="text-gradient">nuestros clientes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg font-light mb-8 md:mb-10">
            Más de 20 industrias, cientos de campañas exitosas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-4">
            {[
              { label: "Google Reviews", rating: "4.9", color: "fill-brand-amber text-brand-amber" },
              { label: "Trustpilot", rating: "4.8", color: "fill-brand-emerald text-brand-emerald" },
              { label: "Clutch.co", rating: "5.0", color: "fill-brand-rose text-brand-rose" },
            ].map((badge) => (
              <div key={badge.label} className="bg-card/50 rounded-xl border border-border/30 px-3.5 md:px-5 py-2.5 md:py-3 flex items-center gap-2.5 md:gap-3 hover:border-primary/20 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-foreground">{badge.rating}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${badge.color}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{badge.label}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.05 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={cardVariants}>
              <div className="bg-card/40 rounded-2xl border border-border/30 p-6 hover:border-primary/20 transition-all duration-500 h-full flex flex-col group">
                <Quote className="h-5 w-5 text-primary/30 mb-3 shrink-0" />
                <blockquote className="text-sm text-foreground/85 leading-relaxed mb-5 flex-1 font-light">
                  "{t.quote}"
                </blockquote>
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50 bg-secondary/40 px-2.5 py-1 rounded-full">
                    {t.context}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/20">
                  <div className="flex items-center gap-3">
                    {t.logo ? (
                      <div className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center overflow-hidden p-1">
                        <img src={t.logo} alt={t.company} className="w-full h-full object-contain rounded-full" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="font-display font-bold text-foreground text-xs">{t.initials}</span>
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-primary font-semibold whitespace-nowrap">{t.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <div className="bg-card/40 rounded-2xl border border-border/30 p-8 md:p-10 relative overflow-hidden">
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
              viewport={{ once: false, amount: 0.1 }}
              transition={{ staggerChildren: 0.06 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10"
            >
              {caseStudies.map((cs, i) => (
                <motion.div key={i} variants={cardVariants} className="bg-secondary/30 rounded-xl border border-border/20 p-4 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    {cs.logo ? (
                      <img src={cs.logo} alt={cs.company} className="h-5 w-5 object-contain rounded-sm" />
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
      </div>
    </section>
  );
};

export default Testimonial;
