import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Headphones, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import agentInbound from "@/assets/characters/agent-inbound.webp";

interface Message {
  role: "system" | "aria" | "client";
  text: string;
}

interface Scenario {
  title: string;
  sector: string;
  messages: Message[];
}

const scenarios: Scenario[] = [
  {
    title: "Clínica Dental Mediterráneo",
    sector: "Dental",
    messages: [
      { role: "system", text: "Llamada entrante — Clínica Dental Mediterráneo" },
      { role: "aria", text: "¡Hola! Clínica Dental Mediterráneo, soy ARIA. ¿En qué puedo ayudarte?" },
      { role: "client", text: "Hola, quería pedir cita para una limpieza dental" },
      { role: "aria", text: "¡Claro! ¿Tienes preferencia de día? Tenemos hueco el jueves a las 10:00 o el viernes a las 16:30." },
      { role: "client", text: "El jueves a las 10 me viene perfecto" },
      { role: "aria", text: "Perfecto. ¿Me das tu nombre completo?" },
      { role: "client", text: "Carmen López García" },
      { role: "aria", text: "Listo, Carmen. Tienes cita el jueves 3 de abril a las 10:00 para limpieza dental. Te llegará confirmación por SMS. ¿Algo más?" },
      { role: "client", text: "No, eso es todo. ¡Gracias!" },
      { role: "aria", text: "¡A ti, Carmen! Nos vemos el jueves. ¡Buen día!" },
      { role: "system", text: "Cita agendada automáticamente en el calendario" },
    ],
  },
  {
    title: "Inmobiliaria Levante",
    sector: "Inmobiliaria",
    messages: [
      { role: "system", text: "Llamada entrante — Inmobiliaria Levante" },
      { role: "aria", text: "Inmobiliaria Levante, buenas tardes. Soy ARIA, ¿en qué puedo ayudarte?" },
      { role: "client", text: "Hola, he visto un piso en vuestra web en el centro de Valencia y quería más información" },
      { role: "aria", text: "¡Qué bien! ¿Recuerdas la referencia del piso o la calle?" },
      { role: "client", text: "Creo que era en la calle Colón, un ático de 3 habitaciones" },
      { role: "aria", text: "¡Sí, lo tengo! Es un ático reformado de 120m² con terraza. ¿Te gustaría agendar una visita para verlo?" },
      { role: "client", text: "Sí, ¿puede ser esta semana?" },
      { role: "aria", text: "Claro, tenemos disponibilidad el miércoles a las 17:00 o el jueves a las 11:00. ¿Cuál te viene mejor?" },
      { role: "client", text: "El miércoles a las 17:00" },
      { role: "aria", text: "Apuntado. ¿Tu nombre y un teléfono de contacto?" },
      { role: "client", text: "Javier Martínez, 654 321 098" },
      { role: "aria", text: "Perfecto, Javier. Visita al ático de calle Colón el miércoles a las 17:00. Te mandamos la ubicación exacta por SMS." },
      { role: "system", text: "Visita agendada · SMS de confirmación enviado" },
    ],
  },
  {
    title: "Restaurante La Brasa",
    sector: "Hostelería",
    messages: [
      { role: "system", text: "Llamada entrante — Restaurante La Brasa (sábado 21:30)" },
      { role: "aria", text: "Restaurante La Brasa, buenas noches. Soy ARIA, ¿en qué puedo ayudarte?" },
      { role: "client", text: "¿Tenéis mesa libre para cenar? Somos 4 personas" },
      { role: "aria", text: "Déjame mirar... Tenemos una mesa a las 22:00 o a las 22:30. ¿Cuál preferís?" },
      { role: "client", text: "A las 22:00 perfecto" },
      { role: "aria", text: "Hecho. ¿Alguna alergia o preferencia que deba anotar?" },
      { role: "client", text: "Sí, uno de nosotros es celíaco" },
      { role: "aria", text: "Anotado. Tenemos opciones sin gluten en la carta. ¿A nombre de quién la reserva?" },
      { role: "client", text: "Pablo Herrera" },
      { role: "aria", text: "Reserva para 4 a las 22:00 a nombre de Pablo. ¡Os esperamos!" },
      { role: "system", text: "Reserva confirmada · Nota de alergia añadida al sistema" },
    ],
  },
  {
    title: "Taller Méndez e Hijos",
    sector: "Taller mecánico",
    messages: [
      { role: "system", text: "Llamada entrante — Taller Méndez e Hijos" },
      { role: "aria", text: "Taller Méndez, buenos días. Soy ARIA, ¿en qué puedo ayudarte?" },
      { role: "client", text: "Buenos días, me ha saltado el testigo del motor y necesito que le echéis un vistazo" },
      { role: "aria", text: "Entendido. ¿Qué coche tienes y más o menos cuándo podrías traerlo?" },
      { role: "client", text: "Es un Seat León de 2019. Si pudiera ser mañana por la mañana..." },
      { role: "aria", text: "Mañana a las 9:00 tenemos un hueco. ¿Te viene bien?" },
      { role: "client", text: "Perfecto, ahí estaré" },
      { role: "aria", text: "Genial. ¿Tu nombre?" },
      { role: "client", text: "Antonio García" },
      { role: "aria", text: "Antonio, te espero mañana a las 9:00 con el Seat León. Si necesitas algo antes, llámanos." },
      { role: "system", text: "Cita de revisión agendada · Modelo del vehículo registrado" },
    ],
  },
  {
    title: "Centro Psicológico Equilibrio",
    sector: "Psicología",
    messages: [
      { role: "system", text: "Llamada entrante — Centro Psicológico Equilibrio" },
      { role: "aria", text: "Centro Psicológico Equilibrio, buenas tardes. Soy ARIA, ¿en qué puedo ayudarte?" },
      { role: "client", text: "Hola, me gustaría pedir cita para una primera consulta" },
      { role: "aria", text: "Por supuesto. ¿Tienes preferencia de horario? Tenemos disponibilidad por las mañanas y por las tardes." },
      { role: "client", text: "Preferiría por las tardes, después de las 17:00" },
      { role: "aria", text: "Perfecto, tenemos hueco el martes a las 17:30 o el jueves a las 18:00. ¿Cuál te viene mejor?" },
      { role: "client", text: "El martes a las 17:30" },
      { role: "aria", text: "Anotado. ¿Tu nombre y un email para enviarte la confirmación?" },
      { role: "client", text: "Lucía Fernández, lucia@gmail.com" },
      { role: "aria", text: "Lucía, primera consulta el martes a las 17:30. Te envío la confirmación por email. Cualquier duda, estamos aquí." },
      { role: "system", text: "Primera consulta agendada · Email de confirmación enviado" },
    ],
  },
];

const CLIENT_NAMES = ["Carmen López García", "Javier Martínez", "Pablo Herrera", "Antonio García", "Lucía Fernández"];
const CLIENT_FIRST = ["Carmen", "Javier", "Pablo", "Antonio", "Lucía"];

const sectorMap: Record<string, number> = {
  dental: 0, inmobiliaria: 1, hosteleria: 2, taller: 3, psicologia: 4,
  legal: 0, estetica: 0, educacion: 0, solar: 0, otro: 0,
};

function getDelay(text: string): number {
  return Math.max(1200, text.length * 30);
}

function personalizeMessages(msgs: Message[], name: string): Message[] {
  const firstName = name.split(" ")[0];
  return msgs.map(m => {
    let text = m.text;
    for (const full of CLIENT_NAMES) text = text.replace(full, name);
    for (const first of CLIENT_FIRST) text = text.replaceAll(first, firstName);
    return { ...m, text };
  });
}

const CallSimulator = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typing, setTyping] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customSector, setCustomSector] = useState("");
  const lastScenarioRef = useRef(-1);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || step >= currentMessages.length) {
      if (step >= currentMessages.length && step > 0) {
        setIsPlaying(false);
        setHasPlayed(true);
      }
      return;
    }
    setTyping(true);
    const delay = getDelay(currentMessages[step].text);
    const timer = setTimeout(() => {
      setTyping(false);
      setStep(s => s + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [isPlaying, step, currentMessages]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [step, typing]);

  const pickScenario = (): number => {
    let next: number;
    do { next = Math.floor(Math.random() * scenarios.length); } while (next === lastScenarioRef.current && scenarios.length > 1);
    lastScenarioRef.current = next;
    return next;
  };

  const handleStart = () => {
    const idx = pickScenario();
    setCurrentMessages(scenarios[idx].messages);
    setCurrentTitle(scenarios[idx].title);
    setStep(0);
    setIsPlaying(true);
    setIsPersonalized(false);
    setTimeout(() => setStep(1), 500);
  };

  const handlePersonalized = () => {
    const name = customName.trim() || "tú";
    const idx = sectorMap[customSector] ?? 0;
    lastScenarioRef.current = idx;
    const msgs = personalizeMessages(scenarios[idx].messages, name);
    setCurrentMessages(msgs);
    setCurrentTitle(scenarios[idx].title);
    setStep(0);
    setIsPlaying(true);
    setIsPersonalized(true);
    setHasPlayed(false);
    setTimeout(() => setStep(1), 500);
  };

  const visibleMessages = currentMessages.slice(0, step);

  return (
    <section id="simulador" className="py-20 md:py-32 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/10 to-transparent" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-brand-teal/[0.08] border border-brand-teal/20 rounded-full px-4 py-1.5 mb-6">
            <Headphones className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-xs text-brand-teal font-display font-semibold tracking-wide">Mira cómo funciona</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight leading-[1.1] text-glow">
            Así atiende <span className="text-gradient text-glow-teal">ARIA tus llamadas</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg font-light">
            Sin filtros. Simulaciones reales de cómo tu recepcionista IA gestiona cada llamada.
          </p>
        </motion.div>

        <div className="bg-card/40 rounded-2xl border border-border/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-teal/[0.08] via-card/60 to-card/40 border-b border-border/20 px-5 py-3 flex items-center gap-3">
            <img src={agentInbound} alt="ARIA" className="w-8 h-8 object-contain" loading="lazy" />
            <div className="flex-1">
              <span className="text-sm font-display font-bold text-brand-teal">ARIA</span>
              <span className="text-[10px] text-muted-foreground ml-2">
                {currentTitle ? `Simulación · ${currentTitle}` : "Simulación de llamada real"}
              </span>
            </div>
            {isPlaying && (
              <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-[3px] bg-brand-teal rounded-full animate-pulse" style={{ height: 8 + Math.random() * 12, animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            )}
          </div>

          {/* Chat */}
          <div ref={chatRef} className="p-5 min-h-[280px] max-h-[420px] overflow-y-auto space-y-3">
            {!isPlaying && step === 0 && !hasPlayed && (
              <div className="flex flex-col items-center justify-center py-10">
                <Phone className="w-12 h-12 text-brand-teal/30 mb-4" />
                <p className="text-sm text-muted-foreground mb-6">Pulsa play para ver una simulación</p>
                <Button onClick={handleStart} className="rounded-full px-6" style={{ background: "linear-gradient(135deg, hsl(190 60% 50%), hsl(190 60% 42%))" }}>
                  <Play className="w-4 h-4 mr-2" /> Ver simulación
                </Button>
              </div>
            )}

            <AnimatePresence>
              {visibleMessages.map((msg, i) => (
                <motion.div
                  key={`${i}-${msg.text.slice(0, 10)}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "client" ? "justify-end" : msg.role === "system" ? "justify-center" : "justify-start"}`}
                >
                  {msg.role === "system" ? (
                    <div className="bg-secondary/40 rounded-lg px-3 py-1.5 flex items-center gap-2">
                      {i === 0 ? <Phone className="w-3 h-3 text-brand-teal" /> : <CheckCircle2 className="w-3 h-3 text-brand-emerald" />}
                      <span className="text-[11px] text-muted-foreground">{msg.text}</span>
                    </div>
                  ) : msg.role === "aria" ? (
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <img src={agentInbound} alt="" className="w-6 h-6 object-contain rounded-full shrink-0 mt-1" />
                      <div className="bg-brand-teal/10 border border-brand-teal/15 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                        <p className="text-sm text-foreground/90 leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[80%]">
                      <div className="bg-secondary/60 border border-border/20 rounded-2xl rounded-tr-sm px-3.5 py-2.5">
                        <p className="text-sm text-foreground/80 leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && isPlaying && step < currentMessages.length && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex ${currentMessages[step]?.role === "client" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-center gap-1 px-4 py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              </motion.div>
            )}

            {!isPlaying && hasPlayed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center pt-4">
                <Button variant="outline" size="sm" onClick={handleStart} className="rounded-full text-sm border-border/40">
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  {isPersonalized ? "Repetir con mi nombre" : "Ver otro caso"}
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Personalization form — shown after first play */}
        {hasPlayed && !isPlaying && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-card/40 border border-border/20">
            <p className="text-sm text-muted-foreground mb-3">¿Quieres verlo con tu nombre y tu sector?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input placeholder="Tu nombre" value={customName} onChange={e => setCustomName(e.target.value)} className="flex-1 bg-secondary/30 border-border/25 rounded-xl h-10" />
              <select value={customSector} onChange={e => setCustomSector(e.target.value)} className="flex-1 bg-secondary/30 border border-border/25 rounded-xl px-3 py-2 text-sm text-foreground">
                <option value="">Tu sector</option>
                <option value="dental">Clínica dental</option>
                <option value="inmobiliaria">Inmobiliaria</option>
                <option value="hosteleria">Restaurante / Hotel</option>
                <option value="taller">Taller mecánico</option>
                <option value="psicologia">Psicología</option>
                <option value="legal">Despacho legal</option>
                <option value="estetica">Centro estético</option>
                <option value="educacion">Academia</option>
                <option value="solar">Empresa solar</option>
                <option value="otro">Otro</option>
              </select>
              <Button onClick={handlePersonalized} size="sm" className="bg-primary hover:bg-primary/90 rounded-full px-5 shrink-0">
                Ver mi simulación
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CallSimulator;
