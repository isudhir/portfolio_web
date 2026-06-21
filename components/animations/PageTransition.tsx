"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps children in a mount fade + slide-in transition.
 * Reduced motion: mounts children instantly with no animation.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const reduced = useReducedMotionSafe();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn(className)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
