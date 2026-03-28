import { useEffect, useRef, useState } from "react";

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
    <section id="stats" className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Innovación en <span className="text-gradient">IA conversacional</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
          Nuestros asistentes virtuales aportan calma a tu negocio gestionando llamadas y citas.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <AnimatedNumber target={s.value} suffix={s.suffix} />
              <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
