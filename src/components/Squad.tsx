import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";
import agentSupport from "@/assets/characters/agent-support.png";
import { ArrowRight, Phone, PhoneOutgoing, CalendarCheck, BarChart3, Heart } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const agents = [
  { name: "ARIA", image: agentInbound, icon: Phone, accentColor: "text-brand-teal" },
  { name: "NOVA", image: agentOutbound, icon: PhoneOutgoing, accentColor: "text-brand-lavender" },
  { name: "LUMI", image: agentScheduler, icon: CalendarCheck, accentColor: "text-brand-emerald" },
  { name: "BYTE", image: agentAnalytics, icon: BarChart3, accentColor: "text-brand-amber" },
  { name: "CARE", image: agentSupport, icon: Heart, accentColor: "text-brand-rose" },
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
    <section id="squad" className="py-24 px-6 relative overflow-hidden section-glow">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] rounded-full bg-brand-lavender/[0.04] blur-[120px]" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary/80 font-display text-sm tracking-[0.2em] uppercase mb-3 font-medium">
            Automatización completa
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
            Así <span className="text-gradient">trabajan juntos</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-light">
            Cada agente sabe cuándo actuar y a quién pasar el testigo. Tú no haces nada.
          </p>
        </div>

        <div className="space-y-8">
          {workflows.map((workflow, wi) => (
            <FadeIn key={workflow.title} delay={wi * 150}>
              <div className="glass rounded-2xl p-6 md:p-8">
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
                                width={512} height={512} loading="lazy"
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
                          <div className="ml-6 h-4 border-l border-dashed border-border/50" />
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
