import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProjectModal, projectHasDetails } from "./ProjectModal";
import type { Project } from "@/types";

const detailed: Project = {
  id: "p1",
  title: "Test Project",
  description: "short",
  image: "/projects/x.svg",
  tech: ["TS"],
  categories: ["AI"],
  longDescription: "the long story",
  highlights: ["shipped a thing"],
  role: "Lead",
  year: "2025",
};

describe("projectHasDetails", () => {
  it("detects case-study fields", () => {
    expect(projectHasDetails(detailed)).toBe(true);
    expect(
      projectHasDetails({
        ...detailed,
        longDescription: undefined,
        highlights: undefined,
        role: undefined,
        year: undefined,
        gallery: undefined,
      })
    ).toBe(false);
  });
});

describe("ProjectModal", () => {
  it("renders a dialog with the case study and closes on Escape", () => {
    const onClose = vi.fn();
    render(<ProjectModal project={detailed} onClose={onClose} />);
    expect(screen.getByRole("dialog", { name: "Test Project" })).toBeInTheDocument();
    expect(screen.getByText("the long story")).toBeInTheDocument();
    expect(screen.getByText("shipped a thing")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders nothing for null project", () => {
    render(<ProjectModal project={null} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
