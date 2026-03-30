import { motion } from "framer-motion";
import { Volume2, Headphones, Clock } from "lucide-react";
import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";

interface CallSample {
  id: string;
  title: string;
  sector: string;
  duration: string;
  agent: string;
  agentImage: string;
  agentColor: string;
  description: string;
}

const callSamples: CallSample[] = [
  {
    id: "1",
    title: "Cita en clínica dental",
    sector: "Salud",
    duration: "1:30",
    agent: "ARIA",
    agentImage: agentInbound,
    agentColor: "brand-teal",
    description: "ARIA recibe una llamada, identifica disponibilidad y agenda una cita de limpieza dental para el jueves.",
  },
  {
    id: "2",
    title: "Campaña outbound — inmobiliaria",
    sector: "Inmobiliaria",
    duration: "2:15",
    agent: "NOVA",
    agentImage: agentOutbound,
    agentColor: "brand-lavender",
    description: "NOVA llama a un lead interesado en una vivienda, califica su presupuesto y agenda visita con el agente comercial.",
  },
  {
    id: "3",
    title: "Seguimiento de lead cualificado",
    sector: "Servicios",
    duration: "1:58",
    agent: "NOVA",
    agentImage: agentOutbound,
    agentColor: "brand-lavender",
    description: "NOVA contacta a un lead que solicitó información, confirma interés y agenda reunión con el equipo comercial.",
  },
];

const CallCard = ({ call }: { call: CallSample }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="group rounded-2xl border border-border/25 bg-card/35 overflow-hidden transition-all duration-400 hover:border-border/40"
  >
    <div className="p-5 md:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={call.agentImage}
            alt={call.agent}
            className="w-10 h-10 object-contain"
            width={512}
            height={512}
            loading="lazy"
          />
          <div>
            <span className={`text-xs font-display font-bold text-${call.agentColor} tracking-wider uppercase`}>
              {call.agent}
            </span>
            <span className="text-[10px] text-muted-foreground/40 ml-2">{call.sector}</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground/40 bg-secondary/30 px-2 py-0.5 rounded-full">
          Próximamente
        </span>
      </div>

      <h4 className="font-display font-bold text-base text-foreground mb-1.5">{call.title}</h4>
      <p className="text-xs text-muted-foreground/70 leading-relaxed mb-4">{call.description}</p>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-end gap-[2px] h-6">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full bg-muted-foreground/20"
              style={{ height: 3 + Math.sin(i * 0.3) * 6, minHeight: 2 }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground/50 shrink-0">
          <Clock className="w-3 h-3" />
          {call.duration}
        </div>
      </div>
    </div>
  </motion.div>
);

const CallPlayer = () => (
  <section className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden">
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
    <div className="absolute bottom-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-brand-teal/[0.03] blur-[160px] pointer-events-none" />

    <div className="container mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16 md:mb-20"
      >
        <div className="inline-flex items-center gap-2 bg-primary/[0.06] border border-primary/15 rounded-full px-4 py-1.5 mb-6">
          <Headphones className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-primary font-display font-semibold tracking-wide">
            Escucha llamadas reales
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight leading-[1.1]">
          No te lo contamos,{" "}
          <span className="text-gradient">escúchalo</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
          Llamadas reales gestionadas por nuestros agentes IA. Sin filtros, sin edición.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
        {callSamples.map((call) => (
          <CallCard key={call.id} call={call} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs text-muted-foreground/30 mt-8"
      >
        <Volume2 className="w-3 h-3 inline mr-1" />
        Nombres de clientes anonimizados por privacidad · Grabaciones de campañas reales en España
      </motion.p>
    </div>
  </section>
);

export default CallPlayer;
