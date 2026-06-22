import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Force the reduced-motion branch so the test renders the static path
// (no whileInView / IntersectionObserver needed in jsdom).
vi.mock("@/hooks/useReducedMotionSafe", () => ({
  useReducedMotionSafe: () => true,
}));

import { SectionDivider } from "./SectionDivider";

describe("SectionDivider", () => {
  it("renders a decorative motif (aria-hidden) in reduced-motion mode", () => {
    const { container } = render(<SectionDivider />);
    const root = container.querySelector('[aria-hidden="true"]');
    expect(root).not.toBeNull();
    // Center diamond is present (rotate-45 element)
    expect(container.querySelector(".rotate-45")).not.toBeNull();
    // No full-width hard line: the old `h-px w-full bg-border` must be gone
    expect(container.querySelector(".w-full.h-px")).toBeNull();
  });
});
