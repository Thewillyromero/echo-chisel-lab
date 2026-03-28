import heroRobot from "@/assets/hero-robot.png";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentScheduler from "@/assets/characters/agent-scheduler.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise-overlay">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(250_60%_50%/0.03)] blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 pt-24">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            Atención telefónica{" "}
            <span className="text-gradient">automatizada con IA</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
            CALLA atiende tus llamadas, agenda citas y responde a tus clientes con una voz natural. Además, lanza campañas de llamadas outbound para appointment setting.
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

        <div className="flex-1 flex justify-center lg:justify-end relative">
          {/* Secondary agents flanking the hero */}
          <img
            src={agentOutbound}
            alt=""
            className="absolute -left-4 bottom-4 w-16 md:w-20 object-contain animate-float opacity-70 hidden lg:block"
            width={512}
            height={512}
            loading="lazy"
            style={{ animationDelay: "0.8s" }}
          />
          <img
            src={heroRobot}
            alt="CALLA Asistente Virtual"
            className="w-72 md:w-96 lg:w-[28rem] animate-float drop-shadow-2xl relative z-10"
            width={1024}
            height={1024}
          />
          <img
            src={agentScheduler}
            alt=""
            className="absolute -right-4 bottom-8 w-14 md:w-18 object-contain animate-float opacity-70 hidden lg:block"
            width={512}
            height={512}
            loading="lazy"
            style={{ animationDelay: "1.6s" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
