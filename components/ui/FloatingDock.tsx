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
  mouseX,
}: {
  id: string;
  label: string;
  href: string;
  icon: string;
  isActive: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - bounds.x - bounds.width / 2;
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
    <div className="relative flex flex-col items-center group">
      {/* Tooltip */}
      <span
        className={cn(
          "absolute -top-8 left-1/2 -translate-x-1/2",
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
        {/* Active indicator dot */}
        {isActive && (
          <span
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple"
            aria-hidden="true"
          />
        )}
        <DockIcon name={icon} size={20} />
      </motion.button>
    </div>
  );
}

/**
 * Fixed bottom-center glass dock driven from data/navigation.ts.
 * Hover magnification, active section highlighting, smooth-scroll on click.
 * Collapses to icon-only on small screens.
 */
export function FloatingDock() {
  const sectionIds = navigation.map((item) => item.id);
  const activeId = useActiveSection(sectionIds);
  const mouseX = useMotionValue(Infinity);

  return (
    <nav
      aria-label="Section navigation dock"
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        // On very small screens collapse to a narrow strip
        "max-w-[calc(100vw-2rem)]"
      )}
    >
      <motion.div
        onMouseMove={(e) => {
          mouseX.set(e.clientX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className={cn(
          "glass flex items-end gap-1 rounded-2xl px-3 py-2",
          "border border-border/50 shadow-lg",
          "overflow-x-auto scrollbar-none"
        )}
        initial={{ y: 100, opacity: 0 }}
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
            mouseX={mouseX}
          />
        ))}
      </motion.div>
    </nav>
  );
}
