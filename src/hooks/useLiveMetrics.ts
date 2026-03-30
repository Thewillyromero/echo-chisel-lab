import { useState, useEffect, useCallback, useRef } from "react";

/** Deterministic base count that never decreases on reload */
function getBaseCount(): number {
  const now = new Date();
  const dayOfMonth = now.getDate();
  const hourOfDay = now.getHours();
  // ~16/day, ~0.7/hour → day 1 ≈ 16, day 15 ≈ 240, day 30 ≈ 480
  return Math.floor(dayOfMonth * 16 + hourOfDay * 0.7);
}

/** Deterministic viewers that changes every 30s but is consistent across components */
function getViewers(): number {
  const seed = Math.floor(Date.now() / 30000);
  const pseudo = ((seed * 9301 + 49297) % 233280) / 233280;
  return Math.floor(pseudo * 12) + 6; // 6–18
}

export interface LiveMetrics {
  testCount: number;
  viewers: number;
  incrementTest: () => void;
}

export function useLiveMetrics(): LiveMetrics {
  const [testCount, setTestCount] = useState(getBaseCount);
  const [viewers, setViewers] = useState(getViewers);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => {
      setTestCount((prev) => prev + 1);
      timerRef.current = setTimeout(tick, Math.random() * 7000 + 18000);
    };
    timerRef.current = setTimeout(tick, Math.random() * 7000 + 18000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setViewers(getViewers()), 30000);
    return () => clearInterval(interval);
  }, []);

  const incrementTest = useCallback(() => {
    setTestCount((prev) => prev + 1);
  }, []);

  return { testCount, viewers, incrementTest };
}
