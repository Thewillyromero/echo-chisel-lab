import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";
import agentScheduler from "@/assets/characters/agent-scheduler.webp";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";
import CharacterReveal from "@/components/CharacterReveal";
import { Phone, PhoneOutgoing, CalendarCheck, BarChart3, ArrowRight, Sparkles, ChevronDown, Check } from "lucide-react";

const features = [
  {
    image: agentInbound,
    agent: "ARIA",
    icon: Phone,
    title: "Atiende llamadas por ti",
    description:
      "Tu asistente responde llamadas entrantes para que puedas centrarte en tu negocio. Disponible 24/7, sin esperas.",
    personality: "La que siempre contesta",
    color: "brand-teal",
    hsl: "190 60% 55%",
    expandedDetails: [
      "Responde llamadas 24/7, incluyendo festivos y fuera de horario",
      "Identifica la intención del llamante y deriva a la persona correcta",
      "Transfiere a un humano cuando detecta urgencia",
      "Voz natural en español e inglés",
    ],
  },
  {
    image: agentOutbound,
    agent: "NOVA",
    icon: PhoneOutgoing,
    title: "Campañas Outbound",
    description:
      "Lanza campañas de llamadas salientes para appointment setting y generación de leads cualificados.",
    personality: "La que no para de llamar",
    color: "brand-lavender",
    hsl: "260 50% 65%",
    expandedDetails: [
      "Campañas de appointment setting automatizadas",
      "Marca hasta 3 llamadas simultáneas por línea",
      "Detecta contestador automático y reintenta",
      "Captura datos estructurados de cada conversación",
    ],
  },
  {
    image: agentScheduler,
    agent: "LUMI",
    icon: CalendarCheck,
    title: "Agenda citas automáticamente",
    description:
      "Recoge pedidos y agenda citas directamente en tu calendario sin intervención humana.",
    personality: "La organizadora perfecta",
    color: "brand-emerald",
    hsl: "160 50% 48%",
    expandedDetails: [
      "Sincroniza con Google Calendar, Calendly y CRMs",
      "Confirma citas y envía recordatorios automáticos",
      "Reagenda no-shows sin intervención humana",
      "Evita solapamientos y dobles reservas",
    ],
  },
  {
    image: agentAnalytics,
    agent: "BYTE",
    icon: BarChart3,
    title: "Analiza cada conversación",
    description:
      "Métricas en tiempo real de cada llamada. Sabe qué funciona y qué mejorar.",
    personality: "El cerebro del equipo",
    color: "brand-amber",
    hsl: "35 70% 58%",
    expandedDetails: [
      "Dashboard de métricas en tiempo real",
      "Transcripción y análisis de sentimiento de cada llamada",
      "Identifica patrones: horas pico, objeciones frecuentes, tasa de cierre",
      "Informes semanales automáticos",
    ],
  },
];

/* ── stop-motion / reveal animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const, // smooth overshoot
    },
  },
};

/* Character "pop-in" — mimics stop-motion bounce */
const characterVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 18,
      delay: 0.15,
    },
  },
};

/* Badge slide-in */
const badgeVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const Features = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="features" className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-[140px] pointer-events-none" />
      {/* Background character — NOVA with reveal */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block">
        <CharacterReveal
          src={agentOutbound}
          alt=""
          className="w-[300px] md:w-[500px] opacity-[0.12]"
          glowColor="hsl(260 50% 65%)"
          revealOffset={[0.05, 0.3]}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/[0.06] border border-primary/15 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-display font-semibold tracking-wide">
              Empleados IA 24/7
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight leading-[1.1] text-glow">
            Tu equipo de IA que{" "}
            <span className="text-gradient text-glow-lavender">nunca duerme</span>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Cada agente está diseñado para un rol específico. Delega y escala
            sin añadir personal.
          </p>
        </motion.div>

        {/* Agent grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-4 md:gap-5"
        >
          {features.map((f, i) => {
            const isHovered = hoveredIdx === i;

            return (
              <motion.div
                key={i}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative rounded-2xl border border-border/25 overflow-visible cursor-pointer transition-all duration-500"
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, hsl(${f.hsl} / 0.06) 0%, hsl(var(--card) / 0.5) 60%)`
                    : "hsl(var(--card) / 0.35)",
                  boxShadow: isHovered
                    ? `0 0 50px hsl(${f.hsl} / 0.07), 0 25px 60px hsl(0 0% 0% / 0.2)`
                    : "0 2px 20px hsl(0 0% 0% / 0.1)",
                  borderColor: isHovered
                    ? `hsl(${f.hsl} / 0.25)`
                    : undefined,
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                <div className="p-6 md:p-8 flex items-start gap-5 md:gap-6 bg-card/80 backdrop-blur-sm rounded-2xl">
                  {/* Character container with stop-motion pop-in — oversized, peeking above card */}
                  <motion.div
                    variants={characterVariants}
                    className="shrink-0 relative -mt-12"
                  >
                    {/* Glow behind character */}
                    <div
                      className="absolute inset-0 rounded-full blur-3xl transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle, hsl(${f.hsl} / ${isHovered ? 0.25 : 0.1}) 0%, transparent 70%)`,
                        transform: "scale(2.2)",
                      }}
                    />

                    {/* Character image */}
                    <motion.img
                      src={f.image}
                      alt={f.agent}
                      className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10 drop-shadow-2xl"
                      width={512}
                      height={512}
                      loading="lazy"
                      animate={
                        isHovered
                          ? {
                              scale: [1, 1.08, 1.04],
                              rotate: [0, -3, 2, 0],
                              y: [0, -6, -4],
                            }
                          : { scale: 1, rotate: 0, y: 0 }
                      }
                      transition={
                        isHovered
                          ? {
                              duration: 0.6,
                              ease: [0.22, 1, 0.36, 1],
                            }
                          : { duration: 0.4 }
                      }
                    />

                    {/* Floating particles on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <>
                          {[...Array(3)].map((_, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, scale: 0, y: 0 }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0.5],
                                y: [-10, -30 - j * 12],
                                x: [0, (j - 1) * 15],
                              }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 1.2,
                                delay: j * 0.15,
                                ease: "easeOut",
                              }}
                              className="absolute top-2 left-1/2 w-1.5 h-1.5 rounded-full z-20"
                              style={{
                                background: `hsl(${f.hsl})`,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    {/* Agent badge */}
                    <motion.div
                      variants={badgeVariants}
                      className="flex items-center gap-2.5 mb-3"
                    >
                      <div
                        className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-300"
                        style={{
                          background: `hsl(${f.hsl} / ${isHovered ? 0.15 : 0.08})`,
                        }}
                      >
                        <f.icon
                          className="h-3.5 w-3.5"
                          style={{ color: `hsl(${f.hsl})` }}
                        />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-xs font-display font-bold tracking-[0.15em] uppercase"
                          style={{ color: `hsl(${f.hsl})` }}
                        >
                          {f.agent}
                        </span>
                        <span className="text-[10px] text-muted-foreground/40 font-medium hidden sm:inline">
                          {f.personality}
                        </span>
                      </div>
                    </motion.div>

                    <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl mb-2.5 text-foreground leading-tight">
                      {f.title}
                    </h3>

                    <p className="text-sm text-muted-foreground/80 leading-relaxed mb-3">
                      {f.description}
                    </p>

                    {/* Expandable details toggle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedIdx(expandedIdx === i ? null : i);
                      }}
                      className="flex items-center gap-1.5 text-xs font-display font-semibold mb-2 transition-colors duration-200 hover:opacity-80"
                      style={{ color: `hsl(${f.hsl})` }}
                    >
                      {expandedIdx === i ? "Ver menos" : "Ver más"}
                      <motion.span
                        animate={{ rotate: expandedIdx === i ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="inline-flex"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedIdx === i && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden space-y-1.5 mb-2"
                        >
                          {f.expandedDetails.map((detail, j) => (
                            <motion.li
                              key={j}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.25, delay: j * 0.06 }}
                              className="flex items-start gap-2 text-xs text-muted-foreground/70 leading-relaxed"
                            >
                              <Check
                                className="h-3.5 w-3.5 mt-0.5 shrink-0"
                                style={{ color: `hsl(${f.hsl})` }}
                              />
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>

                    {/* CTA that reveals on hover */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -8,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-1.5 text-sm font-display font-semibold"
                      style={{ color: `hsl(${f.hsl})` }}
                    >
                      Conocer más
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, hsl(${f.hsl} / 0.6), hsl(${f.hsl} / 0))`,
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
