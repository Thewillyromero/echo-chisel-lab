import { motion } from "framer-motion";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import CharacterReveal from "@/components/CharacterReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Qué es CALLA y cómo funciona?",
    a: "CALLA es una plataforma de IA conversacional que atiende llamadas telefónicas, agenda citas y gestiona campañas outbound de forma autónoma. Nuestros agentes virtuales (ARIA, NOVA, LUMI, BYTE y CARE) trabajan 24/7 con voz natural, sin intervención humana.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "Menos de 30 minutos. Nuestro equipo configura tu agente IA personalizado, lo entrena con la información de tu negocio y lo deja listo para recibir o realizar llamadas desde el primer día.",
  },
  {
    q: "¿Puedo usar CALLA para llamadas entrantes y salientes?",
    a: "Sí. CALLA gestiona tanto inbound (recepción de llamadas, atención al cliente, agenda de citas) como outbound (campañas de appointment setting, seguimiento de leads, encuestas de satisfacción).",
  },
  {
    q: "¿En qué sectores funciona CALLA?",
    a: "CALLA está optimizada para más de 20 sectores: salud, legal, inmobiliario, educación, hostelería, finanzas, seguros, e-commerce y muchos más. Cada agente se adapta al vocabulario y procesos específicos de tu industria.",
  },
  {
    q: "¿Qué pasa si un cliente necesita hablar con una persona real?",
    a: "CALLA detecta automáticamente cuándo una conversación requiere intervención humana y transfiere la llamada a tu equipo en tiempo real, proporcionando un resumen del contexto para que el agente humano pueda continuar sin fricciones.",
  },
  {
    q: "¿Hay periodo de permanencia o compromiso?",
    a: "No. Todos los planes son mensuales sin permanencia. Puedes cancelar, subir o bajar de plan en cualquier momento. Los cambios se aplican en el siguiente ciclo de facturación.",
  },
  {
    q: "¿Cómo se integra CALLA con mis herramientas actuales?",
    a: "CALLA se integra con los principales CRMs, calendarios (Google Calendar, Calendly), sistemas de gestión y herramientas de comunicación mediante API y webhooks. El plan Pro y Enterprise incluyen integraciones personalizadas.",
  },
  {
    q: "¿Qué métricas puedo ver sobre las llamadas?",
    a: "BYTE, nuestro agente de analytics, ofrece métricas en tiempo real: duración de llamadas, tasa de resolución, citas agendadas, sentimiento del cliente, horas pico, y mucho más. Todo accesible desde tu panel de control.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = (i: number) => ({
  hidden: { opacity: 0, y: 15, x: i % 2 === 0 ? -25 : 25 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-28 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.03] blur-[150px] pointer-events-none" />

      {/* Large background character — LUMI with reveal */}
      <div className="absolute -left-8 bottom-10 pointer-events-none select-none hidden lg:block">
        <CharacterReveal
          src={agentScheduler}
          alt=""
          className="w-[280px] md:w-[420px] opacity-[0.12]"
          glowColor="hsl(160 50% 48%)"
          revealOffset={[0.05, 0.35]}
        />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-center mb-14"
        >
          <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold mb-4 md:mb-5 tracking-tight text-puffy">
            Preguntas <span className="text-gradient text-puffy-lavender">frecuentes</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg font-light">
            Todo lo que necesitas saber antes de empezar con CALLA.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={itemVariants(i)}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="bg-card/40 rounded-2xl border border-border/30 px-6 hover:border-primary/20 transition-colors duration-300 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-5 text-[15px]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-5 text-sm">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
