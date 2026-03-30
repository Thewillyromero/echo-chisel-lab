import { useState, useEffect } from "react";
import heroRobot from "@/assets/hero-robot.png";

const ScrollRobot = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setIsFloating(y > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isFloating) return null;

  const topPercent = Math.min(Math.max(20, 50 - (scrollY - 400) * 0.02), 80);

  return (
    <div
      className="fixed right-4 md:right-8 z-30 pointer-events-none hidden md:block transition-all duration-500 ease-out"
      style={{
        top: `${topPercent}%`,
        transform: "translateY(-50%)",
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-2xl opacity-15 scale-[2]" style={{ background: "hsl(190 60% 55%)" }} />
        <img
          src={heroRobot}
          alt=""
          className="w-20 md:w-24 object-contain animate-float drop-shadow-2xl opacity-50 hover:opacity-70 transition-opacity duration-500 pointer-events-auto relative z-10"
          width={256}
          height={256}
          loading="eager"
        />
      </div>
    </div>
  );
};

export default ScrollRobot;
