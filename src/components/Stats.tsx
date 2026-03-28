import { useEffect, useRef, useState } from "react";
import agentAnalytics from "@/assets/characters/agent-analytics.png";

const stats = [
  { value: 2, suffix: "M+", label: "Llamadas gestionadas" },
  { value: 5, suffix: "M+", label: "Usuarios finales" },
  { value: 4.9, suffix: "K+", label: "Valoración 5 estrellas" },
  { value: 3, suffix: "", label: "Años en el mercado" },
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
    <div ref={ref} className="text-4xl md:text-5xl font-display font-bold text-gradient">
      {count}{suffix}
    </div>
  );
};

const Stats = () => {
  return (
    <section id="stats" className="py-24 px-6 relative overflow-hidden section-glow">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3 flex justify-center">
            <img
              src={agentAnalytics}
              alt="BYTE analiza los datos"
              className="w-40 md:w-52 object-contain animate-float drop-shadow-2xl"
              width={512}
              height={512}
              loading="lazy"
            />
          </div>
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Innovación en <span className="text-gradient">IA conversacional</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mb-10">
              Nuestros asistentes virtuales aportan calma a tu negocio gestionando llamadas y citas.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <AnimatedNumber target={s.value} suffix={s.suffix} />
                  <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
