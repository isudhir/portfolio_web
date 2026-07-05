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
    <div className="relative flex items-center group">
      {/* Tooltip — to the right of the icon for the vertical dock */}
      <span
        className={cn(
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
        {/* Active indicator dot — on the left edge */}
        {isActive && (
          <span
            className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-purple"
            aria-hidden="true"
          />
        )}
        <DockIcon name={icon} size={20} />
      </motion.button>
    </div>
  );
}

/**
 * Fixed left-center vertical glass dock driven from data/navigation.ts.
 * Hover magnification, active section highlighting, smooth-scroll on click.
 * Scrolls internally on short viewports.
 */
export function FloatingDock() {
  const sectionIds = navigation.map((item) => item.id);
  const activeId = useActiveSection(sectionIds);
  const mouseY = useMotionValue(Infinity);

  return (
    <nav
      aria-label="Section navigation dock"
      className={cn(
        "fixed left-4 top-1/2 -translate-y-1/2 z-50",
        // Never exceed the viewport height on short screens
        "max-h-[calc(100vh-2rem)]"
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
          "glass flex flex-col items-center gap-1 rounded-2xl px-2 py-3",
          "border border-border/50 shadow-lg",
          // Scrollable on short screens; from sm+ let hover labels overflow
          // to the right instead of being clipped (overflow-y:auto would
          // otherwise force overflow-x to clip too).
          "overflow-y-auto scrollbar-none sm:overflow-visible"
        )}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
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
