import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <div className="glass rounded-2xl p-1 glow-box-strong">
            <div className="bg-secondary rounded-xl aspect-video flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Video / Imagen del equipo</span>
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
