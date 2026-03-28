import { Button } from "@/components/ui/button";
import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentAnalytics from "@/assets/characters/agent-analytics.png";

const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <div className="glass rounded-2xl p-8 glow-box-strong">
            <div className="flex items-end justify-center gap-4">
              <img src={agentOutbound} alt="NOVA" className="w-24 h-24 object-contain animate-float" width={512} height={512} loading="lazy" style={{ animationDelay: "0.5s" }} />
              <img src={agentInbound} alt="ARIA" className="w-32 h-32 object-contain animate-float" width={512} height={512} loading="lazy" />
              <img src={agentAnalytics} alt="BYTE" className="w-24 h-24 object-contain animate-float" width={512} height={512} loading="lazy" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Conócenos
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Contamos con un equipo de profesionales especializados en IA conversacional. Entrenamos y adaptamos tu asistente virtual para que tus clientes reciban la mejor experiencia posible tanto en llamadas entrantes como en campañas outbound.
          </p>
          <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
            Conoce al equipo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
