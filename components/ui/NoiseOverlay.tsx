/**
 * NoiseOverlay — the body already carries `.noise` which renders the grain via CSS
 * pseudo-element. This component adds a subtle vignette on top.
 * Server-renderable (no "use client" needed).
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[2] pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)",
      }}
    />
  );
}
