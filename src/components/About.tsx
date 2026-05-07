import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import agentInbound from "@/assets/characters/agent-inbound.webp";
import agentOutbound from "@/assets/characters/agent-outbound.webp";
import agentAnalytics from "@/assets/characters/agent-analytics.webp";
import CharacterReveal from "@/components/CharacterReveal";
import TextReveal from "@/components/TextReveal";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-28 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex-1"
        >
          <div className="bg-card/40 rounded-3xl border border-border/30 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
            <div className="relative h-64 md:h-80 flex items-end justify-center">
              <div className="absolute left-[5%] bottom-0">
                <CharacterReveal
                  src={agentOutbound}
                  alt="NOVA"
                  className="w-24 md:w-32"
                  glowColor="hsl(260 50% 65%)"
                  revealOffset={[0.1, 0.45]}
                />
              </div>
              <div className="relative z-10">
                <CharacterReveal
                  src={agentInbound}
                  alt="ARIA"
                  className="w-36 md:w-48"
                  glowColor="hsl(190 60% 55%)"
                  revealOffset={[0.08, 0.4]}
                />
              </div>
              <div className="absolute right-[5%] bottom-0">
                <CharacterReveal
                  src={agentAnalytics}
                  alt="BYTE"
                  className="w-24 md:w-32"
                  glowColor="hsl(35 70% 58%)"
                  revealOffset={[0.12, 0.5]}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex-1 max-w-lg"
        >
          <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
            Sobre nosotros
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold mb-5 md:mb-6 tracking-tight text-glow">
            <TextReveal>Conócenos</TextReveal>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4 text-base md:text-lg font-light">
            Contamos con un equipo de profesionales especializados en IA conversacional. Entrenamos y adaptamos tu asistente virtual para que tus clientes reciban la mejor experiencia posible.
          </p>
          <p className="text-muted-foreground/70 leading-relaxed mb-8 font-light">
            Tanto en llamadas entrantes como en campañas outbound, nuestros agentes trabajan 24/7 para que tú puedas centrarte en lo que importa.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-lg shadow-primary/20" onClick={() => document.getElementById("squad")?.scrollIntoView({ behavior: "smooth" })}>
            Conoce al equipo
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
