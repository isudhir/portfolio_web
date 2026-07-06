import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MouseGradient } from "@/components/ui/MouseGradient";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { BackToTop } from "@/components/ui/BackToTop";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { KonamiEasterEgg } from "@/components/ui/KonamiEasterEgg";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SplineBackground } from "@/components/ui/SplineBackground";
import { buildMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col noise">
        {/* Full-viewport 3D scene behind everything (z-0). Follows the cursor
            on fine pointers; disabled under reduced motion. */}
        <SplineBackground />

        {/* Vignette + grain layer (z-2) */}
        <NoiseOverlay />

        {/* Mouse-following page gradient (z-0) */}
        <MouseGradient />

        {/* Scroll progress bar (z-60) */}
        <ScrollProgress />

        {/* Page chrome providers */}
        <TooltipProvider>
          <SmoothScroll>
            {/* Loading overlay (z-9990) */}
            <LoadingScreen />

            {/* Main content */}
            {children}

            {/* Fixed bottom dock (z-50) */}
            <FloatingDock />

            {/* Back to top button (z-50, right side) */}
            <BackToTop />

            {/* Konami-code confetti (z-9995) */}
            <KonamiEasterEgg />

            {/* Additive custom cursor, fine pointers only (z-9999) */}
            <CustomCursor />

            {/* Command palette (z-200+) */}
            <CommandPalette />
          </SmoothScroll>
        </TooltipProvider>
      </body>
    </html>
  );
}
