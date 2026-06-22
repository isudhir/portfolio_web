import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the Lottie player (no canvas/wasm in jsdom).
vi.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: () => <div data-testid="lottie" />,
}));

// Control the active section from the test.
const activeSection = { value: "home" };
vi.mock("@/hooks/useActiveSection", () => ({
  useActiveSection: () => activeSection.value,
}));

import { Mascot } from "./Mascot";
import { mascotMessages } from "@/data/mascot";

describe("Mascot", () => {
  beforeEach(() => {
    activeSection.value = "home";
  });

  it("renders the Lottie player", () => {
    render(<Mascot />);
    expect(screen.getByTestId("lottie")).toBeInTheDocument();
  });

  it("shows the current section's bubble text", () => {
    render(<Mascot />);
    expect(screen.getByText(mascotMessages.home)).toBeInTheDocument();
  });

  it("updates the bubble when the active section changes", () => {
    activeSection.value = "projects";
    const { rerender } = render(<Mascot />);
    rerender(<Mascot />);
    expect(screen.getByText(mascotMessages.projects)).toBeInTheDocument();
  });
});
