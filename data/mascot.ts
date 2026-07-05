/**
 * Speech-bubble text the mascot shows for each section, keyed by the section
 * ids in data/navigation.ts. Keep keys in parity with navigation (enforced by
 * data/mascot.test.ts).
 */
export const mascotMessages: Record<string, string> = {
  home: "Hi there! 👋",
  about: "A bit about me",
  career: "My journey",
  skills: "My toolkit",
  experience: "Where I've worked",
  projects: "Check out my work!",
  github: "My open source 🐙",
  tech: "Tech I love",
  certifications: "My credentials",
  education: "Where I studied 🎓",
  contact: "Let's talk!",
};

/** Shown when the konami code fires (separate from section messages). */
export const mascotKonamiMessage = "🎉 You found the secret!";
