"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  y = 20,
  duration = 0.6,
  threshold = 0.15,
}: AnimatedSectionProps) {
  const { ref, inView } = useInView(threshold);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
      }}
      layout={false}
    >
      {children}
    </motion.div>
  );
}
