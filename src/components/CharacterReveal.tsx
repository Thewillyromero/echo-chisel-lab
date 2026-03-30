import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface CharacterRevealProps {
  src: string;
  alt?: string;
  className?: string;
  glowColor?: string;
  /** Delay before animation starts (in scroll progress, 0-1) */
  revealOffset?: [number, number];
}

/**
 * Sintra.ai-style character reveal: starts looking down (rotated forward),
 * then lifts head/body as user scrolls into view. Single smooth animation,
 * no constant bouncing.
 */
const CharacterReveal = ({
  src,
  alt = "",
  className = "w-48 md:w-64 lg:w-80",
  glowColor = "hsl(190 60% 55%)",
  revealOffset = [0.15, 0.55],
}: CharacterRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring-based transforms for organic feel
  const rawRotateX = useTransform(scrollYProgress, revealOffset, [25, 0]);
  const rawY = useTransform(scrollYProgress, revealOffset, [60, 0]);
  const rawOpacity = useTransform(scrollYProgress, revealOffset, [0, 1]);
  const rawScale = useTransform(scrollYProgress, revealOffset, [0.85, 1]);

  const rotateX = useSpring(rawRotateX, { stiffness: 80, damping: 25, mass: 1.2 });
  const y = useSpring(rawY, { stiffness: 80, damping: 25, mass: 1.2 });
  const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 30 });
  const scale = useSpring(rawScale, { stiffness: 80, damping: 25, mass: 1.2 });

  return (
    <div ref={ref} className="relative" style={{ perspective: "800px" }}>
      {/* Glow — fades in with character */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor.replace(")", " / 0.2)").replace("hsl(", "hsl(")} 0%, transparent 70%)`,
          transform: "scale(2.5)",
          opacity,
        }}
      />

      <motion.img
        src={src}
        alt={alt}
        className={`${className} object-contain relative z-10 drop-shadow-2xl select-none`}
        loading="lazy"
        draggable={false}
        style={{
          rotateX,
          y,
          opacity,
          scale,
          transformOrigin: "center bottom",
        }}
      />
    </div>
  );
};

export default CharacterReveal;
