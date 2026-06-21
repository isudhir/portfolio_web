"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface MagneticButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** When provided, renders as an <a> tag instead of a <button>. */
  href?: string;
  /** Magnetic strength (0‥1). Default 0.3. */
  strength?: number;
  children?: ReactNode;
  /** Additional class names */
  className?: string;
}

export function MagneticButton({
  href,
  strength,
  className,
  children,
  disabled,
  ...rest
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotionSafe();
  const { ref, style } = useMagnetic(strength);

  const sharedClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "transition-colors disabled:pointer-events-none disabled:opacity-50",
    className
  );

  const motionStyle = reducedMotion ? {} : style;

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClassName}
        style={motionStyle}
        aria-disabled={disabled}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={sharedClassName}
      style={motionStyle}
      disabled={disabled}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
