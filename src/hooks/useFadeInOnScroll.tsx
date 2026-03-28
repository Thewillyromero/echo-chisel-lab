import { motion, type Variants } from "framer-motion";

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export const FadeIn = ({
  children,
  delay = 0,
  className = "",
  threshold = 0.15,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}) => {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      transition={{ delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for child elements
export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div variants={fadeInVariants} className={className}>
      {children}
    </motion.div>
  );
};
