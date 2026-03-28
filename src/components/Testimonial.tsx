import { Star } from "lucide-react";
import agentInbound from "@/assets/characters/agent-inbound.png";

const Testimonial = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="glass rounded-2xl p-8 md:p-12 text-center glow-box-strong relative">
          <img
            src={agentInbound}
            alt="ARIA"
            className="absolute -top-10 -right-6 w-20 h-20 object-contain hidden md:block animate-float"
            width={512}
            height={512}
            loading="lazy"
          />
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-primary fill-primary" />
            ))}
          </div>
          <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">
            "Hemos trabajado duro para sacar al mercado un producto sólido, sin fallos y con la mayor seguridad posible, aportando total confianza a las empresas que cuentan con nosotros."
          </blockquote>
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">José Luis Perdomo</span> · Fundador de CALLA
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="text-gradient font-semibold">4.9 de 5 estrellas</span>
            <span>· Basado en 5.000+ opiniones</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
