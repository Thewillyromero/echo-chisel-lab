import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { text: "CALLA ha transformado nuestra atención al cliente. Ya no perdemos ni una llamada.", author: "María L.", role: "Clínica dental" },
  { text: "Implementamos CALLA y en 2 semanas duplicamos las citas agendadas.", author: "Javier R.", role: "Inmobiliaria" },
  { text: "Es como tener una recepcionista que nunca se cansa. Increíble.", author: "Ana P.", role: "Despacho legal" },
];

const SocialProof = () => {
  return (
    <section className="py-8 md:py-12 px-5 md:px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
        >
          {/* Rating badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-emerald-400 text-emerald-400"
                />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-display font-bold text-foreground leading-tight">
                4.9 / 5
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                +200 empresas confían en CALLA
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-border/30" />

          {/* Mini review quotes — scrolling on mobile */}
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar max-w-full pb-1">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0 flex items-start gap-3 bg-card/40 border border-border/20 rounded-xl px-4 py-3 max-w-[280px]"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5 mb-1.5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-3 h-3 fill-emerald-400 text-emerald-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-foreground/80 leading-snug mb-1.5 line-clamp-2">
                    "{r.text}"
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    <span className="font-semibold text-foreground/60">{r.author}</span>
                    {" · "}
                    {r.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
