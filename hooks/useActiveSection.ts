"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section (by id) is most visible in the viewport.
 * @param ids - Array of element ids to observe.
 * @returns The id of the section currently most in view, or the first id as default.
 */
export function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    // Track intersection ratios per element
    const ratios = new Map<string, number>(ids.map((id) => [id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        // Find id with max ratio
        let maxRatio = -1;
        let maxId = ids[0];
        for (const [id, ratio] of ratios) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        }
        setActiveId(maxId);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    const elements: Element[] = [];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      for (const el of elements) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, [ids]);

  return activeId;
}
