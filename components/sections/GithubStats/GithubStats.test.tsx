import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/hooks/useReducedMotionSafe", () => ({ useReducedMotionSafe: () => true }));

import { GithubStats } from "./index";
import { githubStats } from "@/data/githubStats";

describe("GithubStats", () => {
  it("renders every counter and language from data/githubStats.ts", () => {
    render(<GithubStats />);
    for (const c of githubStats.counters) {
      expect(screen.getByText(c.label)).toBeInTheDocument();
    }
    for (const lang of githubStats.languages) {
      expect(screen.getByText(lang.name)).toBeInTheDocument();
    }
  });

  it("renders weeks × 7 heatmap cells", () => {
    const { container } = render(<GithubStats />);
    const cells = container.querySelectorAll("[data-heatmap-cell]");
    expect(cells.length).toBe(githubStats.weeks * 7);
  });
});
