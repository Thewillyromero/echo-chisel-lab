import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";
import agentSupport from "@/assets/characters/agent-support.png";
import { ArrowRight, Phone, PhoneOutgoing, CalendarCheck, BarChart3, Heart } from "lucide-react";

const agents = [
  {
    name: "ARIA",
    role: "Agente Inbound",
    description: "Recibe las llamadas de tus clientes, resuelve dudas y recoge la info que necesitas.",
    image: agentInbound,
    icon: Phone,
    accentColor: "text-primary",
    glowColor: "shadow-[0_0_30px_hsl(185_80%_50%/0.2)]",
  },
  {
    name: "NOVA",
    role: "Agente Outbound",
    description: "Llama a tus leads, presenta tu servicio y detecta interés real.",
    image: agentOutbound,
    icon: PhoneOutgoing,
    accentColor: "text-violet-400",
    glowColor: "shadow-[0_0_30px_hsl(270_60%_60%/0.2)]",
  },
  {
    name: "LUMI",
    role: "Agendador de Citas",
    description: "Cuando hay interés, agenda la cita automáticamente en tu calendario.",
    image: agentScheduler,
    icon: CalendarCheck,
    accentColor: "text-emerald-400",
    glowColor: "shadow-[0_0_30px_hsl(150_60%_50%/0.2)]",
  },
  {
    name: "BYTE",
    role: "Analista de Datos",
    description: "Analiza cada conversación y te muestra qué funciona y qué mejorar.",
    image: agentAnalytics,
    icon: BarChart3,
    accentColor: "text-amber-400",
    glowColor: "shadow-[0_0_30px_hsl(40_80%_55%/0.2)]",
  },
  {
    name: "CARE",
    role: "Éxito del Cliente",
    description: "Hace seguimiento post-cita para asegurar que todo salió bien.",
    image: agentSupport,
    icon: Heart,
    accentColor: "text-rose-400",
    glowColor: "shadow-[0_0_30px_hsl(350_70%_60%/0.2)]",
  },
];

const workflows = [
  {
    title: "Flujo Inbound",
    subtitle: "Un cliente te llama",
    steps: [0, 2, 3, 4], // ARIA → LUMI → BYTE → CARE
    descriptions: [
      "Recibe la llamada",
      "Agenda la cita",
      "Analiza la conversación",
      "Seguimiento post-cita",
    ],
  },
  {
    title: "Flujo Outbound",
    subtitle: "Tú llamas a tus leads",
    steps: [1, 2, 3, 4], // NOVA → LUMI → BYTE → CARE
    descriptions: [
      "Llama al lead",
      "Agenda si hay interés",
      "Mide el rendimiento",
      "Fideliza al cliente",
    ],
  },
];

const Squad = () => {
  return (
    <section id="squad" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-primary font-display text-sm tracking-widest uppercase mb-3">
            El equipo que nunca descansa
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Conoce a tu <span className="text-gradient">Squad de IA</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cinco agentes especializados que trabajan en equipo, pasándose el testigo automáticamente.
          </p>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-24">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className={`glass rounded-2xl p-5 flex flex-col items-center text-center group hover:${agent.glowColor} transition-all duration-500`}
            >
              <div className="relative mb-3">
                <img
                  src={agent.image}
                  alt={`${agent.name} - ${agent.role}`}
                  className="w-24 h-24 md:w-28 md:h-28 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                  width={512}
                  height={512}
                  loading="lazy"
                />
              </div>
              <div className={`flex items-center gap-1.5 mb-1 ${agent.accentColor}`}>
                <agent.icon className="h-3.5 w-3.5" />
                <span className="text-xs font-display font-bold tracking-wider uppercase">
                  {agent.name}
                </span>
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm mb-1.5">
                {agent.role}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {agent.description}
              </p>
            </div>
          ))}
        </div>

        {/* Workflow Journeys */}
        <div className="space-y-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Así <span className="text-gradient">trabajan juntos</span>
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              Cada agente sabe cuándo actuar y a quién pasar el testigo. Tú no haces nada.
            </p>
          </div>

          {workflows.map((workflow) => (
            <div key={workflow.title} className="glass rounded-2xl p-6 md:p-8">
              <div className="mb-6">
                <h4 className="font-display font-bold text-lg text-foreground">
                  {workflow.title}
                </h4>
                <p className="text-sm text-muted-foreground">{workflow.subtitle}</p>
              </div>

              {/* Desktop flow */}
              <div className="hidden md:flex items-center justify-between gap-2">
                {workflow.steps.map((agentIdx, stepIdx) => {
                  const agent = agents[agentIdx];
                  return (
                    <div key={stepIdx} className="flex items-center gap-2 flex-1">
                      <div className="flex flex-col items-center text-center flex-1 group">
                        <div className="relative">
                          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-secondary/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                            <img
                              src={agent.image}
                              alt={agent.name}
                              className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                              width={512}
                              height={512}
                              loading="lazy"
                            />
                          </div>
                          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold ${agent.accentColor}`}>
                            {stepIdx + 1}
                          </div>
                        </div>
                        <span className={`text-xs font-display font-bold ${agent.accentColor}`}>
                          {agent.name}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[120px]">
                          {workflow.descriptions[stepIdx]}
                        </p>
                      </div>

                      {stepIdx < workflow.steps.length - 1 && (
                        <div className="flex items-center gap-1 text-muted-foreground/40 self-start mt-10">
                          <div className="w-8 lg:w-12 h-px bg-gradient-to-r from-border to-border/50" />
                          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile flow */}
              <div className="md:hidden space-y-3">
                {workflow.steps.map((agentIdx, stepIdx) => {
                  const agent = agents[agentIdx];
                  return (
                    <div key={stepIdx}>
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <div className="w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center">
                            <img
                              src={agent.image}
                              alt={agent.name}
                              className="w-9 h-9 object-contain"
                              width={512}
                              height={512}
                              loading="lazy"
                            />
                          </div>
                          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center text-[10px] font-bold ${agent.accentColor}`}>
                            {stepIdx + 1}
                          </div>
                        </div>
                        <div>
                          <span className={`text-xs font-display font-bold ${agent.accentColor}`}>
                            {agent.name}
                          </span>
                          <p className="text-sm text-foreground font-medium">{workflow.descriptions[stepIdx]}</p>
                        </div>
                      </div>
                      {stepIdx < workflow.steps.length - 1 && (
                        <div className="ml-6 h-4 border-l border-dashed border-border/50" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Squad;
