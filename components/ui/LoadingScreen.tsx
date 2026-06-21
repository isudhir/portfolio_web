"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/**
 * Initial loading overlay displayed while the page hydrates.
 * Shows the portfolio name with gradient logo, then fades out.
 * Respects reduced motion (instant dismiss).
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    // Dismiss after a short delay to allow hydration to complete
    const timer = setTimeout(
      () => setVisible(false),
      reduced ? 0 : 1200
    );
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
          aria-hidden="true"
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: "easeOut" }}
          >
            {/* Gradient logo mark */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-purple), var(--accent-indigo), var(--accent-cyan))",
                boxShadow:
                  "0 0 40px color-mix(in oklab, var(--accent-indigo) 40%, transparent)",
              }}
              aria-hidden="true"
            >
              <span className="text-2xl font-bold text-white select-none">S</span>
            </div>

            {/* Name */}
            <div className="text-center">
              <p className="text-gradient text-2xl font-bold tracking-tight">
                Sudhir Kumar
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Software Engineer II
              </p>
            </div>

            {/* Loading bar */}
            {!reduced && (
              <div className="w-40 h-0.5 bg-muted rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))",
                  }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 0.9,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
