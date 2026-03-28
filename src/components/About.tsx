import { Button } from "@/components/ui/button";
import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";
import { FadeIn } from "@/hooks/useFadeInOnScroll";

const About = () => {
  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <FadeIn className="flex-1">
          <div className="bg-card/40 rounded-3xl border border-border/30 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
            <div className="relative h-48 md:h-60 flex items-end justify-center">
              <img src={agentOutbound} alt="NOVA"
                className="absolute left-[10%] bottom-0 w-20 md:w-24 object-contain -rotate-6 hover:rotate-0 transition-transform duration-500 drop-shadow-lg"
                width={512} height={512} loading="lazy" />
              <img src={agentInbound} alt="ARIA"
                className="relative z-10 w-28 md:w-36 object-contain drop-shadow-2xl animate-float"
                width={512} height={512} loading="lazy" />
              <img src={agentAnalytics} alt="BYTE"
                className="absolute right-[10%] bottom-0 w-20 md:w-24 object-contain rotate-6 hover:rotate-0 transition-transform duration-500 drop-shadow-lg"
                width={512} height={512} loading="lazy" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200} className="flex-1 max-w-lg">
          <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
            Sobre nosotros
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold mb-6 tracking-tight">
            Conócenos
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4 text-lg font-light">
            Contamos con un equipo de profesionales especializados en IA conversacional. Entrenamos y adaptamos tu asistente virtual para que tus clientes reciban la mejor experiencia posible.
          </p>
          <p className="text-muted-foreground/70 leading-relaxed mb-8 font-light">
            Tanto en llamadas entrantes como en campañas outbound, nuestros agentes trabajan 24/7 para que tú puedas centrarte en lo que importa.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-lg shadow-primary/20">
            Conoce al equipo
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default About;
