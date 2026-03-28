import agentSupport from "@/assets/characters/agent-support.png";
import iconQuote from "@/assets/icons/icon-quote.png";
import iconStars from "@/assets/icons/icon-stars.png";

const Testimonial = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-brand-rose/[0.03] blur-[100px]" />
      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="glass-warm rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* CARE asomándose sutil */}
          <div className="absolute -bottom-2 right-6 md:right-10 hidden md:block">
            <img
              src={agentSupport}
              alt=""
              className="w-24 object-contain opacity-30"
              width={512}
              height={512}
              loading="lazy"
            />
          </div>

          {/* 3D Quote icon */}
          <div className="mb-6">
            <img
              src={iconQuote}
              alt=""
              className="w-12 h-12 object-contain drop-shadow-md"
              width={512}
              height={512}
              loading="lazy"
            />
          </div>

          <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-light relative z-10">
            "Nos hemos volcado en crear una solución robusta, fiable y con los más altos estándares de seguridad, para que cada empresa que confía en nosotros sienta esa tranquilidad desde el primer día."
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-lavender/30 to-brand-teal/30 flex items-center justify-center">
              <span className="font-display font-bold text-foreground text-sm">GR</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Guillermo Romero</div>
              <div className="text-xs text-muted-foreground">Fundador de CALLA</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/30 flex items-center gap-3">
            <img
              src={iconStars}
              alt="5 estrellas"
              className="h-6 object-contain"
              width={512}
              height={512}
              loading="lazy"
            />
            <span className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">4.9</span> · 5.000+ opiniones
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
