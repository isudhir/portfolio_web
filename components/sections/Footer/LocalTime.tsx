"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { siteMeta } from "@/data/site";

/**
 * Location + live local time. Time renders as a placeholder until mounted
 * (hydration-safe), then updates every 30 s.
 */
export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const t = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: siteMeta.timezone,
      }).format(now)
    : "--:--";

  return (
    <p className="flex items-center gap-3 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <MapPin size={12} aria-hidden="true" />
        {siteMeta.location}
      </span>
      <span className="flex items-center gap-1">
        <Clock size={12} aria-hidden="true" />
        <span>{time} local</span>
      </span>
    </p>
  );
}
