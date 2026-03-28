import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";
import agentSupport from "@/assets/characters/agent-support.png";
import { ArrowRight, Phone, PhoneOutgoing, CalendarCheck, BarChart3, Heart } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const agents = [
  { name: "ARIA", image: agentInbound, icon: Phone, accentColor: "text-brand-teal", role: "Recibe la llamada" },
  { name: "NOVA", image: agentOutbound, icon: PhoneOutgoing, accentColor: "text-brand-lavender", role: "Llama al lead" },
  { name: "LUMI", image: agentScheduler, icon: CalendarCheck, accentColor: "text-brand-emerald", role: "Agenda la cita" },
  { name: "BYTE", image: agentAnalytics, icon: BarChart3, accentColor: "text-brand-amber", role: "Analiza datos" },
  { name: "CARE", image: agentSupport, icon: Heart, accentColor: "text-brand-rose", role: "Seguimiento" },
];

const workflows = [
  {
    title: "Flujo Inbound",
    subtitle: "Un cliente te llama",
    steps: [0, 2, 3, 4],
    descriptions: ["Recibe la llamada", "Agenda la cita", "Analiza la conversación", "Seguimiento post-cita"],
  },
  {
    title: "Flujo Outbound",
    subtitle: "Tú llamas a tus leads",
    steps: [1, 2, 3, 4],
    descriptions: ["Llama al lead", "Agenda si hay interés", "Mide el rendimiento", "Fideliza al cliente"],
  },
];

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
};

const Squad = () => {
  return (
    <section id="squad" className="py-28 px-6 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
            Automatización completa
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight">
            Así <span className="text-gradient">trabajan juntos</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg font-light">
            Cada agente sabe cuándo actuar y a quién pasar el testigo. Tú no haces nada.
          </p>
        </div>

        {/* Agent roster */}
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-14">
            {agents.map((agent) => (
              <div key={agent.name} className="flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card/60 border border-border/30 flex items-center justify-center mb-2 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all duration-300 group-hover:-translate-y-1">
                  <img src={agent.image} alt={agent.name} className="w-12 h-12 md:w-14 md:h-14 object-contain" width={512} height={512} loading="lazy" />
                </div>
                <span className={`text-[10px] font-display font-bold ${agent.accentColor} tracking-wider`}>{agent.name}</span>
                <span className="text-[10px] text-muted-foreground/60">{agent.role}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="space-y-5">
          {workflows.map((workflow, wi) => (
            <FadeIn key={workflow.title} delay={wi * 150}>
              <div className="bg-card/40 rounded-2xl border border-border/30 p-6 md:p-8">
                <div className="mb-6">
                  <h4 className="font-display font-bold text-lg text-foreground">{workflow.title}</h4>
                  <p className="text-sm text-muted-foreground">{workflow.subtitle}</p>
                </div>

                {/* Desktop */}
                <div className="hidden md:flex items-center justify-between gap-2">
                  {workflow.steps.map((agentIdx, stepIdx) => {
                    const agent = agents[agentIdx];
                    return (
                      <div key={stepIdx} className="flex items-center gap-2 flex-1">
                        <div className="flex flex-col items-center text-center flex-1 group">
                          <div className="relative">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-secondary/60 border border-border/20 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:border-primary/30 transition-all duration-300">
                              <img src={agent.image} alt={agent.name} className="w-12 h-12 lg:w-16 lg:h-16 object-contain" width={512} height={512} loading="lazy" />
                            </div>
                            <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold ${agent.accentColor}`}>
                              {stepIdx + 1}
                            </div>
                          </div>
                          <span className={`text-xs font-display font-bold ${agent.accentColor}`}>{agent.name}</span>
                          <p className="text-xs text-muted-foreground mt-1 max-w-[120px]">{workflow.descriptions[stepIdx]}</p>
                        </div>
                        {stepIdx < workflow.steps.length - 1 && (
                          <div className="flex items-center gap-1 text-muted-foreground/30 self-start mt-10">
                            <div className="w-8 lg:w-12 h-px bg-gradient-to-r from-border to-transparent" />
                            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Mobile */}
                <div className="md:hidden space-y-3">
                  {workflow.steps.map((agentIdx, stepIdx) => {
                    const agent = agents[agentIdx];
                    return (
                      <div key={stepIdx}>
                        <div className="flex items-center gap-4">
                          <div className="relative shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-secondary/60 border border-border/20 flex items-center justify-center">
                              <img src={agent.image} alt={agent.name} className="w-9 h-9 object-contain" width={512} height={512} loading="lazy" />
                            </div>
                            <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center text-[10px] font-bold ${agent.accentColor}`}>
                              {stepIdx + 1}
                            </div>
                          </div>
                          <div>
                            <span className={`text-xs font-display font-bold ${agent.accentColor}`}>{agent.name}</span>
                            <p className="text-sm text-foreground font-medium">{workflow.descriptions[stepIdx]}</p>
                          </div>
                        </div>
                        {stepIdx < workflow.steps.length - 1 && (
                          <div className="ml-6 h-4 border-l border-dashed border-border/40" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Squad;
