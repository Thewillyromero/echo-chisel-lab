import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60]"
      aria-hidden="true"
    >
      <div className="h-full w-full bg-gradient-to-r from-brand-teal via-primary to-brand-lavender" />
    </motion.div>
  );
};

export default ScrollProgress;
