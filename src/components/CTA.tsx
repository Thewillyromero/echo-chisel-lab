import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroRobot from "@/assets/hero-robot.png";

const CTA = ({ onContact }: { onContact?: () => void }) => {
  return (
    <section className="py-16 md:py-28 px-5 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <div className="relative rounded-3xl border border-border/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-card/80 to-accent/[0.04]" />

            <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold mb-5 tracking-tight">
                  Empieza <span className="text-gradient">hoy mismo</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 font-light max-w-md">
                  En menos de 30 minutos, puedes tener un asistente virtual gestionando todas tus llamadas y citas.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 text-base shadow-lg shadow-primary/20" onClick={onContact}>
                    Comenzar ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-border/50 hover:bg-secondary/50" onClick={onContact}>
                    Ver demo
                  </Button>
                </div>
              </div>
              <div className="shrink-0 hidden md:block">
                <img src={heroRobot} alt="" className="w-40 lg:w-48 object-contain animate-float drop-shadow-2xl" width={1024} height={1024} loading="lazy" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
