"use client";

import dynamic from "next/dynamic";

/**
 * Client-only, code-split mounts for heavy/interactive pieces. Declaring the
 * `ssr: false` dynamics inside a Client Component is required by the App Router
 * and keeps this JS out of the initial server-rendered payload.
 */

export const LazyChatButton = dynamic(
  () => import("@/components/ai/ChatButton").then((m) => m.ChatButton),
  { ssr: false }
);

export const LazyTechUniverse = dynamic(
  () => import("@/components/sections/TechUniverse").then((m) => m.TechUniverse),
  {
    ssr: false,
    loading: () => <div aria-hidden className="min-h-[480px]" />,
  }
);

export const LazySplineScene = dynamic(
  () => import("@/components/ui/splite").then((m) => m.SplineScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <span className="loader" />
      </div>
    ),
  }
);
