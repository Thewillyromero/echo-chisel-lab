import { FileText, Rocket, Newspaper, ArrowUpRight } from "lucide-react";
import agentScheduler from "@/assets/characters/agent-scheduler.png";

const items = [
  {
    icon: FileText,
    title: "Publicaciones",
    description: "Novedades y contenido de nuestras redes sociales.",
    cta: "Ver publicaciones",
    color: "text-brand-teal",
    iconBg: "bg-brand-teal/10 border-brand-teal/20",
  },
  {
    icon: Rocket,
    title: "Actualizaciones",
    description: "Avances y nuevas funcionalidades de la plataforma.",
    cta: "Ir al blog",
    color: "text-brand-lavender",
    iconBg: "bg-brand-lavender/10 border-brand-lavender/20",
  },
  {
    icon: Newspaper,
    title: "Noticias",
    description: "Hitos y logros de CALLA. ¡No te los pierdas!",
    cta: "Ver noticias",
    color: "text-brand-rose",
    iconBg: "bg-brand-rose/10 border-brand-rose/20",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 px-6 relative">
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-brand-teal/[0.03] blur-[100px]" />
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
          <div className="lg:flex-1">
            <p className="text-primary/80 font-display text-sm tracking-[0.2em] uppercase mb-3 font-medium">
              Mantente al día
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
              Infórmate de nuestros <span className="text-gradient">avances</span>
            </h2>
          </div>
          {/* LUMI peeking from the side — unique pose, not centered */}
          <div className="hidden lg:block shrink-0 relative">
            <img
              src={agentScheduler}
              alt=""
              className="w-28 object-contain drop-shadow-xl -rotate-6 hover:rotate-0 transition-transform duration-500"
              width={512}
              height={512}
              loading="lazy"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 hover:glow-box transition-all duration-500 group flex flex-col cursor-pointer"
            >
              {/* Styled icon badge — each with its own brand color */}
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <h3 className="font-display font-bold text-lg mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">{item.description}</p>
              <div className={`flex items-center gap-1.5 text-sm font-medium ${item.color} group-hover:gap-2.5 transition-all duration-300`}>
                {item.cta}
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
