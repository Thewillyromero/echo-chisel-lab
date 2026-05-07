import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pressQuotes = [
  {
    text: "80% of callers sent to voicemail don't leave messages — they call a competitor instead.",
    source: "Forbes",
    year: "2023",
  },
  {
    text: "Businesses lose $75 billion per year due to poor customer service, with missed calls being the #1 driver.",
    source: "Forbes / NewVoiceMedia",
    year: "2023",
  },
  {
    text: "AI-powered voice assistants reduce call abandonment by up to 60% and increase first-contact resolution by 35%.",
    source: "McKinsey & Company",
    year: "2024",
  },
  {
    text: "Companies that respond to leads within 5 minutes are 21x more likely to qualify them.",
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
    const timer = setInterval(next, 6000);
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
            className="relative rounded-2xl border border-brand-gold/10 p-8 md:p-12 lg:p-16 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(43 50% 55% / 0.03) 0%, hsl(var(--card) / 0.5) 50%, hsl(43 50% 55% / 0.02) 100%)",
            }}
          >
            {/* Decorative quote mark */}
            <div className="absolute top-4 left-6 md:top-6 md:left-10 font-editorial text-[120px] md:text-[180px] leading-none text-brand-gold/[0.07] select-none pointer-events-none">
              &ldquo;
            </div>

            {/* Subtle gold glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-full bg-brand-gold/[0.02] blur-[100px] pointer-events-none" />

            <div className="relative z-10 min-h-[140px] md:min-h-[160px] flex flex-col items-center justify-center" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <blockquote className="font-editorial italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed md:leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>

                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-px bg-brand-gold/30" />
                    <span className="font-editorial font-bold tracking-[0.15em] uppercase text-xs text-brand-gold-muted">
                      {quote.source}
                    </span>
                    {quote.year && (
                      <span className="text-[10px] text-muted-foreground/40">
                        ({quote.year})
                      </span>
                    )}
                    <div className="w-8 h-px bg-brand-gold/30" />
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
