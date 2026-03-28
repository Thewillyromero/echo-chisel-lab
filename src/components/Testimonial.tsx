import { Star } from "lucide-react";
import agentInbound from "@/assets/characters/agent-inbound.png";
import agentSupport from "@/assets/characters/agent-support.png";

const Testimonial = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="glass rounded-2xl p-8 md:p-12 text-center glow-box-strong relative overflow-hidden">
          {/* Decorative robots */}
          <img
            src={agentInbound}
            alt=""
            className="absolute -top-6 -right-4 w-20 h-20 md:w-24 md:h-24 object-contain hidden md:block animate-float opacity-80"
            width={512}
            height={512}
            loading="lazy"
          />
          <img
            src={agentSupport}
            alt=""
            className="absolute -bottom-4 -left-4 w-16 h-16 md:w-20 md:h-20 object-contain hidden md:block animate-float opacity-60"
            width={512}
            height={512}
            loading="lazy"
            style={{ animationDelay: "1.5s" }}
          />

          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-primary fill-primary" />
            ))}
          </div>
          <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic relative z-10">
            "Nos hemos volcado en crear una solución robusta, fiable y con los más altos estándares de seguridad, para que cada empresa que confía en nosotros sienta esa tranquilidad desde el primer día."
          </blockquote>
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">Guillermo Romero</span> · Fundador de CALLA
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
