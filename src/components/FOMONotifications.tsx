import { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";
import { useLiveMetricsContext } from "@/contexts/LiveMetricsContext";

const pool = [
  { type: "demo", text: "María L. de Madrid acaba de probar ARIA", icon: "🎤" },
  { type: "demo", text: "Un despacho legal de Barcelona ha probado ARIA", icon: "🎤" },
  { type: "demo", text: "Dra. García de Málaga acaba de hablar con ARIA", icon: "🎤" },
  { type: "demo", text: "Antonio G. de Zaragoza ha hecho un test con ARIA", icon: "🎤" },
  { type: "demo", text: "Laura M. de Granada ha probado ARIA ahora mismo", icon: "🎤" },
  { type: "demo", text: "Centro dental en Valencia ha probado ARIA", icon: "🎤" },
  { type: "demo", text: "Pedro R. de Bilbao acaba de hablar con ARIA", icon: "🎤" },
  { type: "demo", text: "Un fisioterapeuta de Sevilla ha probado ARIA", icon: "🎤" },
  { type: "demo", text: "Carmen S. de Alicante ha hecho un test con ARIA", icon: "🎤" },
  { type: "demo", text: "Clínica estética en Madrid ha probado ARIA", icon: "🎤" },
  { type: "demo", text: "Asesoría fiscal de Pamplona ha probado ARIA", icon: "🎤" },
  { type: "demo", text: "Juan M. de Murcia acaba de probar ARIA", icon: "🎤" },
  { type: "demo", text: "Taller mecánico de Córdoba ha probado ARIA", icon: "🎤" },
  { type: "demo", text: "Elena P. de Santander ha hablado con ARIA", icon: "🎤" },
  { type: "demo", text: "Inmobiliaria de Las Palmas ha probado ARIA", icon: "🎤" },
  { type: "demo", text: "Andrea V. de Gijón acaba de probar la demo", icon: "🎤" },
  { type: "demo", text: "Gabinete psicológico de Vitoria ha probado ARIA", icon: "🎤" },
  { type: "booking", text: "Carlos R. de Valencia ha reservado una consulta", icon: "📅" },
  { type: "booking", text: "Una clínica dental de Sevilla ha agendado demo", icon: "📅" },
  { type: "booking", text: "Inmobiliaria en Bilbao ha reservado consulta", icon: "📅" },
  { type: "booking", text: "Centro médico de Alicante ha agendado llamada", icon: "📅" },
  { type: "booking", text: "Taller mecánico de Valladolid ha reservado demo", icon: "📅" },
  { type: "booking", text: "Marta F. de Madrid ha agendado una consulta", icon: "📅" },
  { type: "booking", text: "Despacho legal de Zaragoza ha reservado demo", icon: "📅" },
  { type: "booking", text: "Restaurante en Barcelona ha agendado consulta", icon: "📅" },
  { type: "booking", text: "Clínica estética de Málaga ha reservado demo", icon: "📅" },
  { type: "booking", text: "Luis A. de Palma ha reservado una consulta", icon: "📅" },
  { type: "booking", text: "Academia de idiomas de Granada ha agendado demo", icon: "📅" },
  { type: "booking", text: "Instalador solar de Cádiz ha reservado consulta", icon: "📅" },
  { type: "booking", text: "Asesoría de Vigo ha agendado demo personalizada", icon: "📅" },
  { type: "booking", text: "Patricia M. de Oviedo ha reservado consulta", icon: "📅" },
  { type: "booking", text: "Centro veterinario de Toledo ha agendado demo", icon: "📅" },
  { type: "viewing", text: "{n} personas están viendo esta página ahora", icon: "👥" },
  { type: "viewing", text: "{n} empresas están explorando CALLA ahora mismo", icon: "👥" },
  { type: "viewing", text: "{n} personas están mirando los planes ahora", icon: "👥" },
  { type: "viewing", text: "{n} personas están viendo la demo ahora", icon: "👥" },
  { type: "viewing", text: "{n} profesionales están explorando CALLA", icon: "👥" },
  { type: "signup", text: "Una academia de Murcia se acaba de registrar", icon: "🎉" },
  { type: "signup", text: "Clínica dental de Madrid ha activado su cuenta", icon: "🎉" },
  { type: "signup", text: "Inmobiliaria de BCN ha contratado el plan Pro", icon: "🎉" },
  { type: "signup", text: "Centro médico de Sevilla se acaba de registrar", icon: "🎉" },
  { type: "signup", text: "Asesoría legal de Valencia ha activado CALLA", icon: "🎉" },
  { type: "signup", text: "Empresa de reformas de Bilbao ha contratado CALLA", icon: "🎉" },
  { type: "signup", text: "Clínica estética de Málaga ha activado su plan", icon: "🎉" },
  { type: "signup", text: "Restaurante de A Coruña ha contratado el plan Starter", icon: "🎉" },
  { type: "signup", text: "Taller de Zaragoza se ha registrado en CALLA", icon: "🎉" },
  { type: "signup", text: "Consulta dental de Alicante ha activado su cuenta", icon: "🎉" },
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
  const { viewers } = useLiveMetricsContext();
  const viewersRef = useRef(viewers);
  viewersRef.current = viewers;

  const showNext = useCallback(() => {
    if (stopped.current) return;

    let idx: number;
    do {
      idx = Math.floor(Math.random() * pool.length);
    } while (idx === lastIdx.current && pool.length > 1);
    lastIdx.current = idx;

    const item = pool[idx];
    const text = item.text.replace("{n}", String(viewersRef.current));
    const minutesAgo = Math.floor(Math.random() * 8) + 1;

    setCurrent({ text, icon: item.icon, minutesAgo });
    setVisible(true);

    setTimeout(() => setVisible(false), 3500);

    const delay = Math.random() * 6000 + 20000;
    timerRef.current = setTimeout(showNext, delay);
  }, []);

  useEffect(() => {
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
    <div className="fixed bottom-12 left-4 right-4 md:right-auto z-50 md:max-w-[320px]">
      {current && (
        <div
          className={`bg-card/95 backdrop-blur-md border border-border/30 rounded-xl shadow-2xl p-3 pr-8 relative transition-all duration-300 ease-out ${
            visible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0 pointer-events-none"
          }`}
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
        </div>
      )}
    </div>
  );
};

export default FOMONotifications;
