import { useRef, useEffect, useState } from "react";
import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";
import { Phone, PhoneOutgoing, CalendarCheck, BarChart3, ArrowRight } from "lucide-react";

const features = [
  {
    image: agentInbound,
    agent: "ARIA",
    icon: Phone,
    title: "Atiende llamadas por ti",
    description: "Tu asistente responde llamadas entrantes para que puedas centrarte en tu negocio. Disponible 24/7, sin esperas.",
    color: "text-brand-teal",
    borderColor: "group-hover:border-brand-teal/30",
    glowColor: "group-hover:shadow-[0_0_40px_hsl(190_60%_55%/0.08)]",
    animationName: "wave",
    animationDuration: "1.5s",
  },
  {
    image: agentOutbound,
    agent: "NOVA",
    icon: PhoneOutgoing,
    title: "Campañas Outbound",
    description: "Lanza campañas de llamadas salientes para appointment setting y generación de leads cualificados.",
    color: "text-brand-lavender",
    borderColor: "group-hover:border-brand-lavender/30",
    glowColor: "group-hover:shadow-[0_0_40px_hsl(260_50%_65%/0.08)]",
    animationName: "bounce-subtle",
    animationDuration: "1.2s",
  },
  {
    image: agentScheduler,
    agent: "LUMI",
    icon: CalendarCheck,
    title: "Agenda citas automáticamente",
    description: "Recoge pedidos y agenda citas directamente en tu calendario sin intervención humana.",
    color: "text-brand-emerald",
    borderColor: "group-hover:border-brand-emerald/30",
    glowColor: "group-hover:shadow-[0_0_40px_hsl(160_50%_48%/0.08)]",
    animationName: "wiggle",
    animationDuration: "1.5s",
  },
  {
    image: agentAnalytics,
    agent: "BYTE",
    icon: BarChart3,
    title: "Analiza cada conversación",
    description: "Métricas en tiempo real de cada llamada. Sabe qué funciona y qué mejorar.",
    color: "text-brand-amber",
    borderColor: "group-hover:border-brand-amber/30",
    glowColor: "group-hover:shadow-[0_0_40px_hsl(35_70%_58%/0.08)]",
    animationName: "nod",
    animationDuration: "1.3s",
  },
];

const FeatureCard = ({ f, index }: { f: typeof features[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`group relative bg-card/40 rounded-2xl border border-border/30 p-6 md:p-8 transition-all duration-700 cursor-pointer ${f.borderColor} ${f.glowColor} hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="flex items-start gap-5">
        <div className="shrink-0">
          <img
            src={f.image}
            alt={f.agent}
            className="w-20 md:w-24 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
            style={{ animation: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.animation = `${f.animationName} ${f.animationDuration} ease-in-out`; }}
            onMouseLeave={(e) => { e.currentTarget.style.animation = "none"; }}
            width={512} height={512} loading="lazy"
          />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2 mb-3">
            <f.icon className={`h-4 w-4 ${f.color}`} />
            <span className={`text-xs font-display font-bold ${f.color} tracking-widest uppercase`}>
              {f.agent}
            </span>
          </div>
          <h3 className="font-display font-bold text-xl md:text-2xl mb-2 text-foreground">
            {f.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {f.description}
          </p>
          <div className={`flex items-center gap-1.5 text-sm font-medium ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            Conocer más <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-28 px-6 relative">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
            Empleados IA 24/7
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight">
            Tu equipo de IA que{" "}
            <span className="text-gradient">nunca duerme</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
            Cada agente está diseñado para un rol específico. Delega y escala sin añadir personal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
