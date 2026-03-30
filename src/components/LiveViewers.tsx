import { useState, useEffect, useRef } from "react";

const LiveViewers = () => {
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 12) + 6);
  const [demos] = useState(() => {
    const base = Math.floor((new Date().getDate() / 30) * 480) + 20;
    return base + Math.floor(Math.random() * 15);
  });
  const viewersRef = useRef(viewers);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
      const next = Math.min(22, Math.max(4, viewersRef.current + delta));
      viewersRef.current = next;
      setViewers(next);
    }, Math.random() * 10000 + 25000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-md border-t border-border/20 h-8 flex items-center justify-center gap-6">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-xs text-muted-foreground/60">
          <span className="font-semibold text-foreground/70 tabular-nums">{viewers}</span> personas en la web ahora
        </span>
      </div>
      <span className="text-xs text-muted-foreground/30">·</span>
      <span className="text-xs text-muted-foreground/50">
        <span className="font-semibold text-foreground/60 tabular-nums">{demos}</span> demos hoy
      </span>
    </div>
  );
};

export default LiveViewers;
