import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const pool = [
  { type: "demo", text: "María L. de Madrid acaba de probar ARIA", icon: "🎤" },
  { type: "demo", text: "Un despacho legal de Barcelona ha probado la demo", icon: "🎤" },
  { type: "booking", text: "Carlos R. de Valencia ha reservado una consulta", icon: "📅" },
  { type: "booking", text: "Una clínica dental de Sevilla ha agendado demo", icon: "📅" },
  { type: "viewing", text: "{n} personas están viendo esta página ahora", icon: "👥" },
  { type: "demo", text: "Dra. García de Málaga acaba de hablar con ARIA", icon: "🎤" },
  { type: "booking", text: "Inmobiliaria en Bilbao ha reservado consulta", icon: "📅" },
  { type: "viewing", text: "{n} empresas están explorando CALLA ahora mismo", icon: "👥" },
  { type: "demo", text: "Antonio G. de Zaragoza ha completado la demo", icon: "🎤" },
  { type: "booking", text: "Centro médico de Alicante ha agendado llamada", icon: "📅" },
  { type: "signup", text: "Una academia de Murcia se acaba de registrar", icon: "🎉" },
  { type: "demo", text: "Laura M. de Granada ha probado ARIA ahora mismo", icon: "🎤" },
  { type: "viewing", text: "{n} personas están mirando los planes ahora", icon: "👥" },
  { type: "booking", text: "Taller mecánico de Valladolid ha reservado demo", icon: "📅" },
  { type: "result", text: "Clínica en Madrid: 200+ llamadas gestionadas esta semana", icon: "📊" },
  { type: "result", text: "Inmobiliaria en BCN: 15 citas agendadas hoy con CALLA", icon: "📊" },
];

interface Notification {
  text: string;
  icon: string;
  minutesAgo: number;
}

const FOMONotifications = () => {
  const [current, setCurrent] = useState<Notification | null>(null);
  const [visible, setVisible] = useState(false);
  const lastIdx = useRef(-1);
  const dismissCount = useRef(0);
  const stopped = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNext = useCallback(() => {
    if (stopped.current) return;

    let idx: number;
    do {
      idx = Math.floor(Math.random() * pool.length);
    } while (idx === lastIdx.current && pool.length > 1);
    lastIdx.current = idx;

    const item = pool[idx];
    const viewingN = Math.floor(Math.random() * 12) + 6;
    const text = item.text.replace("{n}", String(viewingN));
    const minutesAgo = Math.floor(Math.random() * 8) + 1;

    setCurrent({ text, icon: item.icon, minutesAgo });
    setVisible(true);

    // Auto-hide after 4s
    setTimeout(() => {
      setVisible(false);
    }, 4000);

    // Schedule next
    const delay = Math.random() * 10000 + 15000;
    timerRef.current = setTimeout(showNext, delay);
  }, []);

  useEffect(() => {
    // First notification after 8s
    timerRef.current = setTimeout(showNext, 8000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showNext]);

  const handleDismiss = () => {
    setVisible(false);
    dismissCount.current += 1;
    if (dismissCount.current >= 3) {
      stopped.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-auto z-50 md:max-w-[320px]">
      <AnimatePresence>
        {visible && current && (
          <motion.div
            initial={{ opacity: 0, x: -40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-card/95 backdrop-blur-md border border-border/30 rounded-xl shadow-2xl p-3 pr-8 relative"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-secondary/60 flex items-center justify-center shrink-0 text-sm">
                {current.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-foreground leading-snug">{current.text}</p>
                <p className="text-[10px] text-muted-foreground/40 mt-0.5">
                  hace {current.minutesAgo} min
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FOMONotifications;
