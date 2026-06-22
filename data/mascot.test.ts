import { describe, it, expect } from "vitest";
import { navigation } from "./navigation";
import { mascotMessages } from "./mascot";

describe("mascotMessages", () => {
  it("has a non-empty message for every navigation section", () => {
    for (const item of navigation) {
      expect(mascotMessages[item.id]).toBeTruthy();
    }
  });

  it("has no messages for unknown sections", () => {
    const navIds = new Set(navigation.map((i) => i.id));
    for (const id of Object.keys(mascotMessages)) {
      expect(navIds.has(id)).toBe(true);
    }
  });
});
