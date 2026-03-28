import { Button } from "@/components/ui/button";
import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";
import iconTeam from "@/assets/icons/icon-team.png";
import { FadeIn } from "@/hooks/useFadeInOnScroll";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-brand-emerald/[0.03] blur-[120px]" />
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <FadeIn className="flex-1">
          <div className="glass-warm rounded-2xl p-8 glow-box-strong relative">
            <div className="relative h-48 md:h-56 flex items-end justify-center">
              <img
                src={agentOutbound}
                alt="NOVA"
                className="absolute left-[10%] bottom-0 w-20 md:w-24 object-contain -rotate-6 hover:rotate-0 transition-transform duration-500 drop-shadow-lg"
                width={512} height={512} loading="lazy"
              />
              <img
                src={agentInbound}
                alt="ARIA"
                className="relative z-10 w-28 md:w-36 object-contain drop-shadow-xl animate-float"
                width={512} height={512} loading="lazy"
              />
              <img
                src={agentAnalytics}
                alt="BYTE"
                className="absolute right-[10%] bottom-0 w-20 md:w-24 object-contain rotate-6 hover:rotate-0 transition-transform duration-500 drop-shadow-lg"
                width={512} height={512} loading="lazy"
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200} className="flex-1 max-w-lg">
          <div className="mb-5">
            <img
              src={iconTeam}
              alt=""
              className="w-12 h-12 object-contain drop-shadow-md"
              width={512} height={512} loading="lazy"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-6 tracking-tight">
            Conócenos
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 font-light">
            Contamos con un equipo de profesionales especializados en IA conversacional. Entrenamos y adaptamos tu asistente virtual para que tus clientes reciban la mejor experiencia posible tanto en llamadas entrantes como en campañas outbound.
          </p>
          <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10">
            Conoce al equipo
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default About;
