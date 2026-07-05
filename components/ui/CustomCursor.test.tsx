import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CustomCursor } from "./CustomCursor";

describe("CustomCursor", () => {
  it("renders nothing when the pointer is not fine (touch/jsdom)", () => {
    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeNull();
  });
});
