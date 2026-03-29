import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import agentAnalytics from "@/assets/characters/agent-analytics.png";

const stats = [
  { value: 2, suffix: "M+", label: "Llamadas gestionadas" },
  { value: 5, suffix: "M+", label: "Usuarios finales" },
  { value: 4.9, suffix: "/5", label: "Valoración media" },
  { value: 3, suffix: " años", label: "En el mercado" },
];

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Number(current.toFixed(1)));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground">
      {count}<span className="text-primary">{suffix}</span>
    </div>
  );
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const Stats = () => {
  return (
    <section id="stats" className="py-16 md:py-28 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="lg:w-1/3 flex justify-center"
          >
            <img
              src={agentAnalytics}
              alt="BYTE analiza los datos"
              className="w-40 md:w-56 object-contain animate-float drop-shadow-2xl"
              width={512} height={512} loading="lazy"
            />
          </motion.div>
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            >
              <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-4 font-semibold">
                Resultados probados
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-3 tracking-tight">
                Innovación en <span className="text-gradient">IA conversacional</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mb-12 text-lg font-light">
                Nuestros asistentes virtuales aportan calma a tu negocio gestionando llamadas y citas.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-2 gap-x-10 gap-y-8"
            >
              {stats.map((s, i) => (
                <motion.div key={i} variants={statVariants} className="group">
                  <AnimatedNumber target={s.value} suffix={s.suffix} />
                  <p className="text-sm text-muted-foreground mt-2 font-light">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
