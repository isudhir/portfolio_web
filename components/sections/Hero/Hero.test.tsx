import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/hooks/useReducedMotionSafe", () => ({ useReducedMotionSafe: () => true }));
vi.mock("./HeroBackground", () => ({ HeroBackground: () => null }));
vi.mock("./RotatingSubtitle", () => ({ RotatingSubtitle: () => null }));

import { Hero } from "./index";
import { heroData } from "@/data/hero";

describe("Hero", () => {
  it("renders the name as the h1", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: heroData.name })
    ).toBeInTheDocument();
  });

  it("shows the availability badge when enabled", () => {
    render(<Hero />);
    expect(screen.getByText(heroData.availability.label)).toBeInTheDocument();
  });
});
