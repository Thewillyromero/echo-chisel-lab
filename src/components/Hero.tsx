import heroRobot from "@/assets/hero-robot.png";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = ({ onContact }: { onContact?: () => void }) => {
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
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.05] blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-rose/[0.04] blur-[100px]" />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-brand-teal/[0.03] blur-[80px]" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 pt-24">
        <div className="flex-1 max-w-2xl">
          <p className="text-primary/80 font-display text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Atención telefónica inteligente
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] mb-6 tracking-tight">
            Tus llamadas,{" "}
            <span className="text-gradient">resueltas por IA</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed font-light">
            CALLA atiende tus llamadas, agenda citas y responde a tus clientes con una voz natural. Lanza campañas outbound para appointment setting.
          </p>
          <p className="text-base text-muted-foreground/70 mb-8">
            Inbound + Outbound. Todo en una sola plataforma.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="glow-box text-base px-8" onClick={onContact}>
              Empezar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-border hover:bg-secondary" onClick={onContact}>
              Ver demo
            </Button>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 scale-150 rounded-full bg-accent/[0.06] blur-[80px]" />
            <img
              src={heroRobot}
              alt="CALLA Asistente Virtual"
              className="w-72 md:w-96 lg:w-[26rem] animate-float drop-shadow-2xl relative z-10"
              width={1024}
              height={1024}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
