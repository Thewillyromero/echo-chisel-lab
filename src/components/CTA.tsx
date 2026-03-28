import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import agentSupport from "@/assets/characters/agent-support.png";

const CTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-lavender/[0.03] via-transparent to-transparent" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="glass-warm rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 glow-box-strong">
          <img
            src={agentSupport}
            alt="CARE te acompaña"
            className="w-28 md:w-36 object-contain shrink-0 animate-float"
            width={512}
            height={512}
            loading="lazy"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Empieza <span className="text-gradient">hoy mismo</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-xl">
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
