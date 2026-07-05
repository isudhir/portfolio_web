import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/hooks/useReducedMotionSafe", () => ({ useReducedMotionSafe: () => true }));

import { Footer } from "./index";
import { navigation } from "@/data/navigation";
import { siteMeta } from "@/data/site";

describe("Footer", () => {
  it("derives its nav links from data/navigation.ts", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: /footer/i });
    for (const item of navigation.filter((i) => i.id !== "home")) {
      expect(nav).toHaveTextContent(item.label);
    }
  });

  it("shows the location from data/site.ts", () => {
    render(<Footer />);
    expect(screen.getByText(siteMeta.location)).toBeInTheDocument();
  });
});
