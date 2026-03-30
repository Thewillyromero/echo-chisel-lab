import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reviews = [
  { text: "CALLA ha transformado nuestra atención al cliente. Ya no perdemos ni una llamada.", author: "María L.", role: "Clínica dental" },
  { text: "Impresionante. Duplicamos citas en el primer mes.", author: "Javier R.", role: "Inmobiliaria" },
  { text: "Nuestros pacientes no notan que hablan con una IA. Increíble.", author: "Dra. Carmen S.", role: "Centro médico" },
  { text: "Recuperamos 15 llamadas perdidas al día. Literalmente nos paga solo.", author: "Antonio G.", role: "Taller mecánico" },
  { text: "El outbound de CALLA nos genera 40 citas cualificadas al mes.", author: "Laura M.", role: "Energía solar" },
  { text: "Mis recepcionistas ahora se dedican a lo importante. CALLA gestiona el teléfono.", author: "Pedro V.", role: "Despacho legal" },
];

/** Trustpilot-style star: green square with white star inside */
const TrustpilotStar = ({ size = 20, filled = true }: { size?: number; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" rx="2" fill={filled ? "#00b67a" : "#dcdce6"} />
    <path
      d="M10 3.5l1.95 4.1 4.35.6-3.15 3.05.75 4.35L10 13.35 6.1 15.6l.75-4.35L3.7 8.2l4.35-.6L10 3.5z"
      fill={filled ? "#fff" : "#fff"}
      fillOpacity={filled ? 1 : 0.3}
    />
  </svg>
);

const TrustpilotStars = ({ rating = 5, size = 20, count = 5 }: { rating?: number; size?: number; count?: number }) => {
  const fullStars = Math.floor(rating);
  const hasPartial = rating % 1 > 0;

  return (
    <div className="flex items-center" style={{ gap: '2px' }}>
      {[...Array(count)].map((_, i) => {
        if (i < fullStars) return <TrustpilotStar key={i} size={size} filled />;
        if (i === fullStars && hasPartial) {
          return (
            <div key={i} className="relative" style={{ width: size, height: size }}>
              <TrustpilotStar size={size} filled={false} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                <TrustpilotStar size={size} filled />
              </div>
            </div>
          );
        }
        return <TrustpilotStar key={i} size={size} filled={false} />;
      })}
    </div>
  );
};

const SocialProof = () => {
  return (
    <section className="py-6 md:py-10 px-5 md:px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-card/30 border border-border/20 rounded-2xl p-5 md:p-6"
        >
          {/* Top row: rating + badge */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-5">
            {/* Rating block */}
            <div className="flex items-center gap-3">
              <TrustpilotStars rating={4.9} size={28} />
              <div className="flex flex-col">
                <span className="text-lg font-display font-bold text-foreground leading-tight">
                  4.9 / 5
                </span>
                <span className="text-xs text-muted-foreground leading-tight">
                  Basado en +200 opiniones
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-10 bg-border/30" />

            {/* Excellent badge */}
            <div className="flex items-center gap-2.5">
              <div className="px-3.5 py-1.5 rounded-md font-display font-bold text-sm tracking-wide" style={{ backgroundColor: '#00b67a', color: '#fff' }}>
                Excelente
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#00b67a' }} />
                  Verificado
                </span>
                <span className="text-[10px] text-muted-foreground">
                  +200 empresas confían en CALLA
                </span>
              </div>
            </div>
          </div>

          {/* Mini review cards — horizontal scroll */}
          <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0 bg-card/50 border border-border/20 rounded-xl px-4 py-3.5 w-[260px] flex flex-col hover:border-border/40 transition-all duration-300"
              >
                <div className="mb-2">
                  <TrustpilotStars rating={5} size={16} />
                </div>
                <p className="text-xs text-foreground/80 leading-snug mb-2.5 flex-1 line-clamp-2 italic">
                  "{r.text}"
                </p>
                <p className="text-[10px] text-muted-foreground mt-auto">
                  <span className="font-semibold text-foreground/60">{r.author}</span>
                  {" · "}
                  {r.role}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
