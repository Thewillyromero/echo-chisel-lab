import { createContext, useContext, ReactNode } from "react";
import { useLiveMetrics, LiveMetrics } from "@/hooks/useLiveMetrics";

const LiveMetricsContext = createContext<LiveMetrics>({
  testCount: 0,
  viewers: 0,
  incrementTest: () => {},
});

export const LiveMetricsProvider = ({ children }: { children: ReactNode }) => {
  const metrics = useLiveMetrics();
  return (
    <LiveMetricsContext.Provider value={metrics}>
      {children}
    </LiveMetricsContext.Provider>
  );
};

export const useLiveMetricsContext = () => useContext(LiveMetricsContext);
