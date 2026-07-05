import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/hooks/useReducedMotionSafe", () => ({ useReducedMotionSafe: () => true }));

import { Education } from "./index";
import { education } from "@/data/education";

describe("Education", () => {
  it("renders every entry from data/education.ts", () => {
    render(<Education />);
    for (const entry of education) {
      expect(screen.getByText(entry.institution)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(entry.degree))).toBeInTheDocument();
    }
  });
});
