import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import agentScheduler from "@/assets/characters/agent-scheduler.png";
import iconPublications from "@/assets/icons/icon-publications.png";
import iconUpdates from "@/assets/icons/icon-updates.png";
import iconNews from "@/assets/icons/icon-news.png";

const items = [
  {
    icon: iconPublications,
    title: "Publicaciones",
    description: "Novedades y contenido de nuestras redes sociales.",
    cta: "Ver publicaciones",
    color: "text-brand-teal",
    hoverBorder: "hover:border-brand-teal/30",
  },
  {
    icon: iconUpdates,
    title: "Actualizaciones",
    description: "Avances y nuevas funcionalidades de la plataforma.",
    cta: "Ir al blog",
    color: "text-brand-lavender",
    hoverBorder: "hover:border-brand-lavender/30",
  },
  {
    icon: iconNews,
    title: "Noticias",
    description: "Hitos y logros de CALLA. ¡No te los pierdas!",
    cta: "Ver noticias",
    color: "text-brand-rose",
    hoverBorder: "hover:border-brand-rose/30",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const Blog = () => {
  return (
    <section id="blog" className="py-28 px-6 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex flex-col lg:flex-row items-center gap-8 mb-14"
        >
          <div className="lg:flex-1">
            <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
              Mantente al día
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
              Infórmate de nuestros <span className="text-gradient">avances</span>
            </h2>
          </div>
          <div className="hidden lg:block shrink-0">
            <img src={agentScheduler} alt="" className="w-20 object-contain drop-shadow-lg -rotate-6 hover:rotate-0 transition-transform duration-500 opacity-60" width={512} height={512} loading="lazy" />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={cardVariants}>
              <div className={`bg-card/40 rounded-2xl border border-border/30 p-6 ${item.hoverBorder} transition-all duration-500 group flex flex-col cursor-pointer h-full hover:-translate-y-1`}>
                <div className="mb-5">
                  <img src={item.icon} alt="" className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md" width={512} height={512} loading="lazy" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed font-light">{item.description}</p>
                <div className={`flex items-center gap-1.5 text-sm font-medium ${item.color} group-hover:gap-2.5 transition-all duration-300`}>
                  {item.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
