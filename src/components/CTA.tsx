import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Empieza <span className="text-gradient">hoy mismo</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          En menos de 30 minutos, puedes tener un asistente virtual gestionando todas tus llamadas y citas. ¿A qué esperas?
        </p>
        <Button size="lg" className="glow-box text-base px-10">
          Comenzar ahora
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default CTA;
