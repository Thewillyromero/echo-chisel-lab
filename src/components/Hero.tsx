import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import heroRobot from "@/assets/hero-robot.png";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = ({ onContact }: { onContact?: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Character starts "looking down" and lifts head as page loads / user sees it
  const rawRotateX = useTransform(scrollYProgress, [0, 0.3], [0, 15]);
  const rawY = useTransform(scrollYProgress, [0, 0.4], [0, 40]);
  const rotateX = useSpring(rawRotateX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex items-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />

      <div className="absolute top-1/3 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/[0.04] blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-accent/[0.03] blur-[120px]" />

      <div className="container mx-auto px-5 md:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-12 pt-20 md:pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex-1 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 bg-primary/[0.08] border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-medium">Atención telefónica inteligente</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] mb-5 md:mb-6 tracking-tight text-foreground text-puffy">
            Tus llamadas,{" "}
            <span className="text-gradient text-puffy-teal">resueltas por IA</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground mb-3 md:mb-4 leading-relaxed font-light max-w-xl">
            CALLA atiende tus llamadas, agenda citas y responde a tus clientes con una voz natural. Lanza campañas outbound para appointment setting.
          </p>
          <p className="text-sm md:text-base text-muted-foreground/50 mb-6 md:mb-8">
            Inbound + Outbound. Todo en una sola plataforma.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-base px-8 shadow-lg shadow-primary/25" onClick={onContact}>
              Empezar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 border-border/50 hover:bg-secondary/50" onClick={onContact}>
              Ver demo
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotateX: 30, scale: 0.8 }}
          animate={{ opacity: 1, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex justify-center lg:justify-end"
          style={{ perspective: "800px" }}
        >
          <div className="relative">
            <div className="absolute inset-0 scale-[2.5] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, hsl(190 60% 55% / 0.2), transparent 70%)" }} />
            <motion.img
              src={heroRobot}
              alt="CALLA Asistente Virtual"
              className="w-64 sm:w-80 md:w-[26rem] lg:w-[32rem] drop-shadow-2xl relative z-10"
              width={1024}
              height={1024}
              style={{
                rotateX,
                y,
                transformOrigin: "center bottom",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
