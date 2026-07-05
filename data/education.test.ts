import { describe, it, expect } from "vitest";
import { education } from "./education";

describe("education data", () => {
  it("has at least one entry with unique ids and required fields", () => {
    expect(education.length).toBeGreaterThan(0);
    const ids = new Set(education.map((e) => e.id));
    expect(ids.size).toBe(education.length);
    for (const e of education) {
      expect(e.institution).toBeTruthy();
      expect(e.degree).toBeTruthy();
      expect(e.duration).toBeTruthy();
    }
  });
});
