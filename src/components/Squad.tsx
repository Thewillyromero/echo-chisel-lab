import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";
import agentSupport from "@/assets/characters/agent-support.png";

const agents = [
  {
    name: "ARIA",
    role: "Agente Inbound",
    description: "Atiende llamadas entrantes con voz natural y resuelve consultas al instante.",
    image: agentInbound,
    accent: "from-primary to-cyan-400",
  },
  {
    name: "NOVA",
    role: "Agente Outbound",
    description: "Lanza campañas de llamadas salientes para captación y appointment setting.",
    image: agentOutbound,
    accent: "from-violet-500 to-purple-400",
  },
  {
    name: "LUMI",
    role: "Agendador de Citas",
    description: "Coordina y agenda citas automáticamente sin intervención humana.",
    image: agentScheduler,
    accent: "from-emerald-500 to-teal-400",
  },
  {
    name: "BYTE",
    role: "Analista de Datos",
    description: "Analiza cada interacción y genera insights para optimizar tu negocio.",
    image: agentAnalytics,
    accent: "from-amber-500 to-orange-400",
  },
  {
    name: "CARE",
    role: "Soporte & Éxito",
    description: "Garantiza la satisfacción del cliente con seguimiento proactivo post-llamada.",
    image: agentSupport,
    accent: "from-rose-500 to-pink-400",
  },
];

const Squad = () => {
  return (
    <section id="squad" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-sm tracking-widest uppercase mb-3">
            El equipo que nunca descansa
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Conoce a tu <span className="text-gradient">Squad de IA</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cinco agentes especializados trabajando 24/7 para que tu negocio funcione en piloto automático.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {agents.map((agent, i) => (
            <div
              key={agent.name}
              className="glass rounded-2xl p-5 flex flex-col items-center text-center group hover:glow-box transition-all duration-500"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative mb-4">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${agent.accent} rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                />
                <img
                  src={agent.image}
                  alt={`${agent.name} - ${agent.role}`}
                  className="w-32 h-32 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                  width={256}
                  height={256}
                  loading="lazy"
                />
              </div>

              <span
                className={`text-xs font-display font-bold tracking-wider bg-gradient-to-r ${agent.accent} bg-clip-text text-transparent mb-1`}
              >
                {agent.name}
              </span>
              <h3 className="font-display font-semibold text-foreground mb-2 text-sm">
                {agent.role}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {agent.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Squad;
