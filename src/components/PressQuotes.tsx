import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pressQuotes = [
  {
    text: "El 80% de las personas que llegan al buz\u00f3n de voz no dejan mensaje \u2014 llaman a la competencia.",
    source: "Forbes",
    year: "2023",
  },
  {
    text: "Las empresas pierden 75.000 millones de d\u00f3lares al a\u00f1o por mala atenci\u00f3n al cliente, siendo las llamadas perdidas el factor n\u00ba1.",
    source: "NewVoiceMedia",
    year: "2023",
  },
  {
    text: "Los asistentes de voz con IA reducen el abandono de llamadas hasta un 60% y aumentan la resoluci\u00f3n en primer contacto un 35%.",
    source: "McKinsey & Company",
    year: "2024",
  },
  {
    text: "Las empresas que responden a un lead en menos de 5 minutos tienen 21 veces m\u00e1s probabilidades de cualificarlo.",
    source: "Harvard Business Review",
    year: "2023",
  },
];

const PressQuotes = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % pressQuotes.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const quote = pressQuotes[current];

  return (
    <section
      className="py-10 md:py-16 px-5 md:px-6 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-center text-[11px] font-editorial font-bold tracking-[0.25em] uppercase mb-6 text-brand-gold-muted">
            Lo que dicen los expertos
          </p>

          <div
            className="glow-border relative rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(43 50% 55% / 0.03) 0%, hsl(var(--card) / 0.5) 50%, hsl(43 50% 55% / 0.02) 100%)",
            }}
          >
            {/* Subtle grid lines background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(hsl(0 0% 100% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            {/* Subtle gold glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-full bg-brand-gold/[0.02] blur-[100px] pointer-events-none" />

            <div className="relative z-10 min-h-[200px] md:min-h-[260px] flex flex-col items-center justify-center" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-center"
                >
                  {/* Source masthead — HUGE, Forbes-style */}
                  <div className="mb-6 md:mb-8">
                    <span className={`font-editorial font-bold text-foreground/90 tracking-tight leading-none ${
                      quote.source.length > 15
                        ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                        : "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                    }`}>
                      {quote.source}
                    </span>
                  </div>

                  {/* Quote — smaller, italic, below the masthead */}
                  <blockquote className="font-editorial italic text-base sm:text-lg md:text-xl text-muted-foreground/70 leading-relaxed max-w-2xl mx-auto mb-4">
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>

                  <div className="flex items-center justify-center gap-2">
                    <span className="font-editorial font-bold italic text-xs text-muted-foreground/40">
                      &mdash;{quote.source}
                    </span>
                    {quote.year && (
                      <span className="text-[10px] text-muted-foreground/30">
                        (Citation, {quote.year})
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-8" role="tablist">
              {pressQuotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-brand-gold w-6"
                      : "bg-border/40 hover:bg-border/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PressQuotes;
