import { FileText, Rocket, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import agentInbound from "@/assets/characters/agent-inbound.png";
import agentOutbound from "@/assets/characters/agent-outbound.png";
import agentSupport from "@/assets/characters/agent-support.png";

const items = [
  {
    icon: FileText,
    image: agentInbound,
    title: "Publicaciones",
    description: "Novedades y contenido de nuestras redes sociales.",
    cta: "Ver publicaciones",
  },
  {
    icon: Rocket,
    image: agentOutbound,
    title: "Actualizaciones",
    description: "Avances y nuevas funcionalidades de la plataforma.",
    cta: "Ir al blog",
  },
  {
    icon: Newspaper,
    image: agentSupport,
    title: "Noticias",
    description: "Hitos y logros de CALLA. ¡No te los pierdas!",
    cta: "Ver noticias",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary font-display text-sm tracking-widest uppercase mb-3">
            Mantente al día
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Infórmate de nuestros <span className="text-gradient">avances</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover:glow-box transition-all duration-500 group flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={item.image}
                    alt=""
                    className="w-9 h-9 object-contain"
                    width={512}
                    height={512}
                    loading="lazy"
                  />
                </div>
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{item.description}</p>
              <Button variant="link" className="text-primary p-0 h-auto justify-start">{item.cta}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
