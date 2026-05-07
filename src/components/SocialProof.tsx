import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { TrustpilotStars } from "@/components/TrustpilotStars";
import avatarElena from "@/assets/avatars/elena-garcia.webp";
import avatarRoberto from "@/assets/avatars/roberto-mendez.webp";
import avatarCarmen from "@/assets/avatars/carmen-ortega.webp";
import avatarJorge from "@/assets/avatars/jorge-navarro.webp";
import avatarMarta from "@/assets/avatars/marta-jimenez.webp";
import avatarLaura from "@/assets/avatars/laura-m.webp";
import avatarSergio from "@/assets/avatars/sergio-lopez.webp";

const reviews = [
  { text: "CALLA ha transformado nuestra atención al cliente. Ya no perdemos ni una llamada.", author: "María L.", role: "Clínica dental", avatar: avatarElena },
  { text: "Impresionante. Duplicamos citas en el primer mes.", author: "Javier R.", role: "Inmobiliaria", avatar: avatarRoberto },
  { text: "Nuestros pacientes no notan que hablan con una IA. Increíble.", author: "Dra. Carmen S.", role: "Centro médico", avatar: avatarCarmen },
  { text: "Recuperamos 15 llamadas perdidas al día. Literalmente nos paga solo.", author: "Antonio G.", role: "Taller mecánico", avatar: avatarSergio },
  { text: "El outbound de CALLA nos genera 40 citas cualificadas al mes.", author: "Laura M.", role: "Energía solar", avatar: avatarLaura },
  { text: "Mis recepcionistas ahora se dedican a lo importante. CALLA gestiona el teléfono.", author: "Pedro V.", role: "Despacho legal", avatar: avatarJorge },
];

const SocialProof = () => (
  <section
    className="py-6 md:py-10 px-5 md:px-6 relative overflow-hidden cursor-pointer"
    onClick={() => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })}
  >
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-card/30 border border-border/20 rounded-2xl p-5 md:p-6 hover:border-border/30 transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-5">
          <div className="flex items-center gap-3">
            <TrustpilotStars rating={4.9} size={28} />
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold text-foreground leading-tight">4.9 / 5</span>
              <span className="text-xs text-muted-foreground leading-tight">Basado en +200 opiniones</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-border/30" />
          <div className="flex items-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded-md font-display font-bold text-sm tracking-wide" style={{ backgroundColor: '#00b67a', color: '#fff' }}>Excelente</div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#00b67a' }} />Verificado
              </span>
              <span className="text-[10px] text-muted-foreground">+200 empresas confían en CALLA</span>
            </div>
          </div>
        </div>
        <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }} className="flex-shrink-0 bg-card/50 border border-border/20 rounded-xl px-4 py-3.5 w-[220px] md:w-[260px] flex flex-col hover:border-border/40 transition-all duration-300">
              <div className="mb-2"><TrustpilotStars rating={5} size={16} /></div>
              <p className="text-xs text-foreground/80 leading-snug mb-2.5 flex-1 line-clamp-2 italic">"{r.text}"</p>
              <div className="flex items-center gap-2 mt-auto">
                <img src={r.avatar} alt={r.author} className="w-5 h-5 rounded-full object-cover" loading="lazy" />
                <p className="text-[10px] text-muted-foreground"><span className="font-semibold text-foreground/60">{r.author}</span> · {r.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default SocialProof;
