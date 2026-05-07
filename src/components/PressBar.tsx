import { motion } from "framer-motion";

const publications = [
  { name: "Forbes", className: "font-editorial font-bold italic text-base md:text-lg" },
  { name: "McKinsey", className: "font-body font-semibold tracking-wide text-sm md:text-base" },
  { name: "Bloomberg", className: "font-body font-bold tracking-tight text-sm md:text-base" },
  { name: "Harvard Business Review", className: "font-editorial text-xs md:text-sm tracking-wide" },
  { name: "TechCrunch", className: "font-body font-extrabold tracking-tighter text-sm md:text-base" },
  { name: "El Pa\u00eds", className: "font-editorial font-bold italic text-sm md:text-base" },
];

const PressBar = () => (
  <section className="py-5 md:py-7 px-5 md:px-6 border-t border-border/10">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.8 }}
      className="container mx-auto max-w-4xl"
    >
      <p className="text-center text-[10px] font-editorial tracking-[0.2em] uppercase text-brand-gold-muted/60 mb-4">
        Datos publicados en
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-3">
        {publications.map((pub, i) => (
          <motion.span
            key={pub.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`${pub.className} text-foreground/20 hover:text-foreground/45 transition-all duration-500 cursor-default select-none`}
          >
            {pub.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  </section>
);

export default PressBar;
