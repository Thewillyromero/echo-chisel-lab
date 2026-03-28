import { FileText, Rocket, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  {
    icon: FileText,
    title: "Publicaciones",
    description: "Novedades y contenido de nuestras redes sociales.",
    cta: "Ver publicaciones",
  },
  {
    icon: Rocket,
    title: "Actualizaciones",
    description: "Avances y nuevas funcionalidades de la plataforma.",
    cta: "Ir al blog",
  },
  {
    icon: Newspaper,
    title: "Noticias",
    description: "Hitos y logros de VoxAI. ¡No te los pierdas!",
    cta: "Ver noticias",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
          Infórmate de nuestros <span className="text-gradient">avances</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="glass rounded-xl p-6 hover:glow-box transition-shadow duration-300">
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <Button variant="link" className="text-primary p-0 h-auto">{item.cta}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
