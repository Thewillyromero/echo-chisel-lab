import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";
import agentScheduler from "@/assets/characters/agent-scheduler.webp";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";
import { Phone, PhoneOutgoing, CalendarCheck, BarChart3, Sparkles } from "lucide-react";

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
  },
];

/* ── Subcomponents ── */

const FeatureCard = ({
  feature: f,
  index: i,
  scrollProgress,
}: {
  feature: (typeof features)[0];
  index: number;
  scrollProgress: ReturnType<typeof useTransform<number>>;
}) => {
  const opacity = useTransform(
    scrollProgress,
    [i - 0.5, i, i + 0.5],
    [0, 1, i === features.length - 1 ? 1 : 0],
  );
  const y = useTransform(
    scrollProgress,
    [i - 0.5, i, i + 0.5],
    [30, 0, i === features.length - 1 ? 0 : -30],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `hsl(${f.hsl} / 0.12)` }}
        >
          <f.icon className="h-5 w-5" style={{ color: `hsl(${f.hsl})` }} />
        </div>
        <div>
          <span
            className="text-xs font-display font-bold tracking-[0.15em] uppercase"
            style={{ color: `hsl(${f.hsl})` }}
          >
            {f.agent}
          </span>
          <span className="text-[10px] text-muted-foreground/40 ml-2">
            {f.personality}
          </span>
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-extrabold mb-4 text-foreground tracking-tight">
        {f.title}
      </h3>
      <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed font-light">
        {f.description}
      </p>

      {/* Accent line */}
      <div
        className="mt-6 h-1 w-16 rounded-full"
        style={{
          background: `linear-gradient(90deg, hsl(${f.hsl}), hsl(${f.hsl} / 0.3))`,
        }}
      />
    </motion.div>
  );
};

const AgentVisual = ({
  feature: f,
  index: i,
  scrollProgress,
}: {
  feature: (typeof features)[0];
  index: number;
  scrollProgress: ReturnType<typeof useTransform<number>>;
}) => {
  const opacity = useTransform(
    scrollProgress,
    [i - 0.5, i, i + 0.5],
    [0, 1, i === features.length - 1 ? 1 : 0],
  );
  const scale = useTransform(
    scrollProgress,
    [i - 0.5, i, i + 0.5],
    [0.8, 1, i === features.length - 1 ? 1 : 0.8],
  );
  const rotate = useTransform(
    scrollProgress,
    [i - 0.5, i, i + 0.5],
    [-8, 0, i === features.length - 1 ? 0 : 8],
  );

  return (
    <motion.div
      style={{ opacity, scale, rotate }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Glow behind character */}
      <div
        className="absolute inset-0 rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, hsl(${f.hsl} / 0.2), transparent 70%)`,
        }}
      />
      <img
        src={f.image}
        alt={f.agent}
        className="w-56 md:w-72 lg:w-80 object-contain relative z-10 drop-shadow-2xl"
        width={512}
        height={512}
        loading="lazy"
      />
    </motion.div>
  );
};

/* ── Main component ── */

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active index (0-3)
  const activeIndexFloat = useTransform(scrollYProgress, [0, 1], [0, 3]);

  return (
    <section id="features" className="relative">
      {/* Section header — not sticky */}
      <div className="py-20 md:py-28 px-5 md:px-6">
        <div className="container mx-auto text-center mb-0">
          <div className="inline-flex items-center gap-2 bg-primary/[0.06] border border-primary/15 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-display font-semibold tracking-wide">
              Empleados IA 24/7
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight leading-[1.1] text-glow">
            Tu equipo de IA que{" "}
            <span className="text-gradient text-glow-lavender">
              nunca duerme
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Cada agente está diseñado para un rol específico. Delega y escala
            sin añadir personal.
          </p>
        </div>
      </div>

      {/* Desktop: Sticky scroll reveal */}
      <div
        ref={containerRef}
        style={{ height: `${features.length * 100}vh` }}
        className="relative hidden lg:block"
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="container mx-auto px-5 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Left: Feature text cards that change based on scroll */}
              <div className="flex-1 max-w-lg relative h-64">
                {features.map((f, i) => (
                  <FeatureCard
                    key={i}
                    feature={f}
                    index={i}
                    scrollProgress={activeIndexFloat}
                  />
                ))}
              </div>

              {/* Right: Agent character that transitions */}
              <div className="flex-1 flex justify-center">
                <div className="relative w-72 md:w-96 h-72 md:h-96">
                  {features.map((f, i) => (
                    <AgentVisual
                      key={i}
                      feature={f}
                      index={i}
                      scrollProgress={activeIndexFloat}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Simple stacked cards fallback */}
      <div className="lg:hidden px-5 md:px-6 pb-20">
        <div className="container mx-auto grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/25 bg-card/80 backdrop-blur-sm p-6"
              style={{
                borderColor: `hsl(${f.hsl} / 0.15)`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `hsl(${f.hsl} / 0.12)` }}
                >
                  <f.icon
                    className="h-4 w-4"
                    style={{ color: `hsl(${f.hsl})` }}
                  />
                </div>
                <span
                  className="text-xs font-display font-bold tracking-[0.15em] uppercase"
                  style={{ color: `hsl(${f.hsl})` }}
                >
                  {f.agent}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg mb-2 text-foreground leading-tight">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
