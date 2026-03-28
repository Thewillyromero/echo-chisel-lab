import { ArrowUpRight } from "lucide-react";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import iconPublications from "@/assets/icons/icon-publications.png";
import iconUpdates from "@/assets/icons/icon-updates.png";
import iconNews from "@/assets/icons/icon-news.png";
import { FadeIn } from "@/hooks/useFadeInOnScroll";

const items = [
  {
    icon: iconPublications,
    title: "Publicaciones",
    description: "Novedades y contenido de nuestras redes sociales.",
    cta: "Ver publicaciones",
    color: "text-brand-teal",
  },
  {
    icon: iconUpdates,
    title: "Actualizaciones",
    description: "Avances y nuevas funcionalidades de la plataforma.",
    cta: "Ir al blog",
    color: "text-brand-lavender",
  },
  {
    icon: iconNews,
    title: "Noticias",
    description: "Hitos y logros de CALLA. ¡No te los pierdas!",
    cta: "Ver noticias",
    color: "text-brand-rose",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 px-6 relative">
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-brand-teal/[0.03] blur-[100px]" />
      <div className="container mx-auto relative z-10">
        <FadeIn>
          <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
            <div className="lg:flex-1">
              <p className="text-primary/80 font-display text-sm tracking-[0.2em] uppercase mb-3 font-medium">
                Mantente al día
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
                Infórmate de nuestros <span className="text-gradient">avances</span>
              </h2>
            </div>
            <div className="hidden lg:block shrink-0">
              <img
                src={agentScheduler}
                alt=""
                className="w-20 object-contain drop-shadow-lg -rotate-6 hover:rotate-0 transition-transform duration-500 opacity-80"
                width={512} height={512} loading="lazy"
              />
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div className="glass rounded-2xl p-6 hover:glow-box transition-all duration-500 group flex flex-col cursor-pointer h-full">
                <div className="mb-5">
                  <img
                    src={item.icon}
                    alt=""
                    className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                    width={512} height={512} loading="lazy"
                  />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">{item.description}</p>
                <div className={`flex items-center gap-1.5 text-sm font-medium ${item.color} group-hover:gap-2.5 transition-all duration-300`}>
                  {item.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
