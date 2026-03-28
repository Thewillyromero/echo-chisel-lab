import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";

const features = [
  {
    image: agentInbound,
    agent: "ARIA",
    title: "Atiende llamadas por ti",
    description: "Tu asistente responde llamadas entrantes para que puedas centrarte en tu negocio. Disponible 24/7, sin esperas.",
  },
  {
    image: agentOutbound,
    agent: "NOVA",
    title: "Campañas Outbound",
    description: "Lanza campañas de llamadas salientes para appointment setting y generación de leads cualificados.",
  },
  {
    image: agentScheduler,
    agent: "LUMI",
    title: "Agenda citas automáticamente",
    description: "Recoge pedidos y agenda citas directamente en tu calendario sin intervención humana.",
  },
  {
    image: agentAnalytics,
    agent: "BYTE",
    title: "Analiza cada conversación",
    description: "Métricas en tiempo real de cada llamada. Sabe qué funciona y qué mejorar.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      {/* Ambient orb */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] rounded-full bg-primary/[0.03] blur-[100px]" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 md:p-8 flex items-start gap-5 group hover:glow-box transition-all duration-500"
            >
              <div className="shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-secondary/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={f.image}
                    alt={f.agent}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
                    width={512}
                    height={512}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-display font-bold text-primary tracking-wider uppercase">
                  {f.agent}
                </span>
                <h3 className="font-display font-semibold text-lg md:text-xl mb-2 text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
