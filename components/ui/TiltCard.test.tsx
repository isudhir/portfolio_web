import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TiltCard } from "./TiltCard";

describe("TiltCard", () => {
  it("renders children (inert) when pointer is not fine", () => {
    render(
      <TiltCard>
        <p>content</p>
      </TiltCard>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
