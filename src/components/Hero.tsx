import heroRobot from "@/assets/hero-robot.png";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 pt-24">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            Atención telefónica{" "}
            <span className="text-gradient">automatizada con IA</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
            VoxAI atiende tus llamadas, agenda citas y responde a tus clientes con una voz natural. Además, lanza campañas de llamadas outbound para appointment setting.
          </p>
          <p className="text-base text-muted-foreground/70 mb-8">
            Inbound + Outbound. Todo en una sola plataforma.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="glow-box text-base px-8">
              Empezar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-border hover:bg-secondary">
              Ver demo
            </Button>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={heroRobot}
            alt="VoxAI Asistente Virtual"
            className="w-72 md:w-96 lg:w-[28rem] animate-float drop-shadow-2xl"
            width={800}
            height={800}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
