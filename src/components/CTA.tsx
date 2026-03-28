import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroRobot from "@/assets/hero-robot.png";

const CTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-lavender/[0.03] via-transparent to-transparent" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="glass-warm rounded-2xl p-8 md:p-12 relative overflow-hidden glow-box-strong">
          {/* Hero robot en el lateral — como mascota de despedida */}
          <div className="absolute -right-6 -bottom-4 hidden md:block opacity-20">
            <img
              src={heroRobot}
              alt=""
              className="w-48 object-contain rotate-12"
              width={1024}
              height={1024}
              loading="lazy"
            />
          </div>

          <div className="relative z-10 text-center md:text-left max-w-xl">
            <div className="w-10 h-10 rounded-xl bg-brand-lavender/10 border border-brand-lavender/20 flex items-center justify-center mb-5 md:mx-0 mx-auto">
              <Sparkles className="h-5 w-5 text-brand-lavender" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4 tracking-tight">
              Empieza <span className="text-gradient">hoy mismo</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 font-light">
              En menos de 30 minutos, puedes tener un asistente virtual gestionando todas tus llamadas y citas. ¿A qué esperas?
            </p>
            <Button size="lg" className="glow-box text-base px-10">
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
