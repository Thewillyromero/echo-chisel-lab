import { useRef, useEffect, useState } from "react";
import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";
import { Phone, PhoneOutgoing, CalendarCheck, BarChart3 } from "lucide-react";

const features = [
  {
    image: agentInbound,
    agent: "ARIA",
    icon: Phone,
    title: "Atiende llamadas por ti",
    description: "Tu asistente responde llamadas entrantes para que puedas centrarte en tu negocio. Disponible 24/7, sin esperas.",
    color: "text-brand-teal",
    bgGlow: "bg-brand-teal/[0.08]",
    iconBg: "bg-brand-teal/10",
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
    bgGlow: "bg-brand-lavender/[0.08]",
    iconBg: "bg-brand-lavender/10",
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
    bgGlow: "bg-brand-emerald/[0.08]",
    iconBg: "bg-brand-emerald/10",
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
    bgGlow: "bg-brand-amber/[0.08]",
    iconBg: "bg-brand-amber/10",
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 150}ms` }}
      className={`glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10 group hover:glow-box transition-all duration-700 relative overflow-hidden ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full ${f.bgGlow} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

      <div className="shrink-0 relative z-10">
        <img
          src={f.image}
          alt={f.agent}
          className={`w-24 md:w-28 object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-500`}
          style={{ animation: "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.animation = `${f.animationName} ${f.animationDuration} ease-in-out`; }}
          onMouseLeave={(e) => { e.currentTarget.style.animation = "none"; }}
          width={512}
          height={512}
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-8 h-8 rounded-lg ${f.iconBg} flex items-center justify-center`}>
            <f.icon className={`h-4 w-4 ${f.color}`} />
          </div>
          <span className={`text-xs font-display font-bold ${f.color} tracking-wider uppercase`}>
            {f.agent}
          </span>
        </div>
        <h3 className="font-display font-bold text-xl md:text-2xl mb-3 text-foreground">
          {f.title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
          {f.description}
        </p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 relative section-glow">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] rounded-full bg-brand-lavender/[0.04] blur-[100px]" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[250px] rounded-full bg-brand-rose/[0.03] blur-[100px]" />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary/80 font-display text-sm tracking-[0.2em] uppercase mb-3 font-medium">
            Todo automatizado
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
            ¿Qué <span className="text-gradient">hacemos</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Automatizamos tu comunicación telefónica de principio a fin, tanto entrante como saliente.
          </p>
        </div>

        <div className="space-y-6">
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;