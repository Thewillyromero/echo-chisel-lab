import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import heroRobot from "@/assets/hero-robot.webp";

const InteractiveRobot = () => {
  const [visible, setVisible] = useState(false);
  const [dodging, setDodging] = useState(false);
  const robotRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth - 100 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  const robotX = useSpring(mouseX, { stiffness: 15, damping: 20, mass: 2 });
  const robotY = useSpring(mouseY, { stiffness: 15, damping: 20, mass: 2 });

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let lastMove = 0;
    const handleMouse = (e: MouseEvent) => {
      if (dodging) return;
      const now = Date.now();
      if (now - lastMove < 50) return;
      lastMove = now;
      const targetX = Math.min(e.clientX + 200, window.innerWidth - 80);
      mouseX.set(targetX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [dodging, mouseX, mouseY]);

  const handleClick = useCallback(() => {
    if (dodging) return;
    setDodging(true);
    const newX = window.innerWidth - Math.random() * 200 - 60;
    const newY = Math.random() * (window.innerHeight - 200) + 100;
    mouseX.set(newX);
    mouseY.set(newY);
    setTimeout(() => setDodging(false), 800);
  }, [dodging, mouseX, mouseY]);

  if (!visible) return null;

  return (
    <motion.div
      ref={robotRef}
      className="fixed z-30 cursor-pointer hidden lg:block"
      style={{
        x: robotX,
        y: robotY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: dodging ? 0.8 : 0.5,
        scale: dodging ? 1.3 : 1,
        rotate: dodging ? [0, -20, 20, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { type: "spring", stiffness: 300, damping: 15 },
        rotate: { duration: 0.4 },
      }}
      whileHover={{
        scale: 1.15,
        opacity: 0.7,
        transition: { duration: 0.2 },
      }}
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: "radial-gradient(circle, hsl(190 60% 50% / 0.2) 0%, transparent 70%)",
            transform: "scale(2)",
          }}
        />
        <motion.img
          src={heroRobot}
          alt=""
          className="w-16 md:w-20 object-contain drop-shadow-2xl select-none"
          draggable={false}
          animate={
            dodging
              ? {}
              : {
                  y: [0, -6, 0, -3, 0],
                  rotate: [0, -2, 0, 2, 0],
                }
          }
          transition={
            dodging
              ? {}
              : {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      </div>
    </motion.div>
  );
};

export default InteractiveRobot;
