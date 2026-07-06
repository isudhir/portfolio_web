"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { LucideProps } from "lucide-react";

// Resolve lucide icon by name string
function DockIcon({ name, ...props }: { name: string } & LucideProps) {
  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<LucideProps>
  >;
  const Icon = icons[name] ?? icons["Circle"];
  return <Icon {...props} />;
}

const ICON_SIZE = 40; // px, base size
const MAX_SCALE = 1.6;
const SPREAD = 80; // distance in px over which magnification spreads

function DockItem({
  id,
  label,
  href,
  icon,
  isActive,
  mouseY,
}: {
  id: string;
  label: string;
  href: string;
  icon: string;
  isActive: boolean;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  // Vertical dock: magnify based on the cursor's distance along the Y axis.
  const distance = useTransform(mouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      y: 0,
      height: 0,
    };
    return val - bounds.y - bounds.height / 2;
  });

  const scaleRaw = useTransform(
    distance,
    [-SPREAD, 0, SPREAD],
    [1, MAX_SCALE, 1]
  );
  const scale = useSpring(scaleRaw, { stiffness: 300, damping: 25 });

  const handleClick = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Fallback: navigate to href
      window.location.hash = href;
    }
  };

  return (
    <div className="relative flex items-center group shrink-0">
      {/* Tooltip — to the right of the icon for the vertical dock. Hidden on
          mobile: no hover there, and it would poke past the viewport edge. */}
      <span
        className={cn(
          "hidden md:block",
          "absolute left-full top-1/2 -translate-y-1/2 ml-3",
          "rounded-md px-2 py-0.5 text-xs whitespace-nowrap",
          "bg-card/90 text-foreground border border-border",
          "opacity-0 group-hover:opacity-100 pointer-events-none",
          "transition-opacity duration-150"
        )}
      >
        {label}
      </span>

      <motion.button
        ref={ref}
        onClick={handleClick}
        aria-label={label}
        className={cn(
          "relative flex items-center justify-center rounded-xl transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive
            ? "text-purple bg-card/80"
            : "text-muted-foreground hover:text-foreground"
        )}
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          scale,
        }}
      >
        {/* Active indicator dot — below the icon on mobile, on the left edge
            for the desktop vertical rail */}
        {isActive && (
          <span
            className={cn(
              "absolute w-1 h-1 rounded-full bg-purple",
              "-bottom-1 left-1/2 -translate-x-1/2",
              "md:bottom-auto md:-left-1.5 md:top-1/2 md:translate-x-0 md:-translate-y-1/2"
            )}
            aria-hidden="true"
          />
        )}
        <DockIcon name={icon} size={20} />
      </motion.button>
    </div>
  );
}

/**
 * Fixed glass dock driven from data/navigation.ts. Vertical left-center rail
 * on md+ (hover magnification, tooltips); horizontal bottom bar on mobile so
 * it never overlaps section content. Scrolls internally when it can't fit.
 */
export function FloatingDock() {
  const sectionIds = navigation.map((item) => item.id);
  const activeId = useActiveSection(sectionIds);
  const mouseY = useMotionValue(Infinity);

  return (
    <nav
      aria-label="Section navigation dock"
      className={cn(
        "fixed z-50",
        // Mobile: bottom-centered horizontal bar (respects home-indicator inset)
        "bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2",
        "max-w-[calc(100vw-1.5rem)]",
        // md+: left-center vertical rail, never taller than the viewport
        "md:bottom-auto md:left-4 md:top-1/2 md:max-w-none md:translate-x-0 md:-translate-y-1/2",
        "md:max-h-[calc(100vh-2rem)]"
      )}
    >
      <motion.div
        onMouseMove={(e) => {
          mouseY.set(e.clientY);
        }}
        onMouseLeave={() => {
          mouseY.set(Infinity);
        }}
        className={cn(
          "glass flex items-center gap-1 rounded-2xl",
          "border border-border/50 shadow-lg",
          // Mobile: horizontal row, swipeable when items exceed the width
          "flex-row overflow-x-auto px-3 py-2 scrollbar-none",
          // md+: vertical column; overflow stays visible so hover labels can
          // extend to the right instead of being clipped
          "md:flex-col md:overflow-visible md:px-2 md:py-3"
        )}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.5 }}
      >
        {navigation.map((item) => (
          <DockItem
            key={item.id}
            id={item.id}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={activeId === item.id}
            mouseY={mouseY}
          />
        ))}
      </motion.div>
    </nav>
  );
}
