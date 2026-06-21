/**
 * AI Chat widget data — suggested questions and greeting copy.
 * Components read from here; no display strings live in components.
 */

export interface SuggestedQuestion {
  id: string;
  label: string;
}

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { id: 'about',      label: 'Tell me about yourself' },
  { id: 'projects',   label: 'What projects have you built?' },
  { id: 'ai',         label: 'What AI technologies do you use?' },
  { id: 'experience', label: 'What is your experience?' },
  { id: 'contact',    label: 'How can I contact you?' },
  { id: 'current',    label: 'What are you working on currently?' },
];

/** Short greeting shown at the top of an empty conversation. */
export const CHAT_GREETING =
  "Hi! I'm Sudhir's AI assistant. Ask me anything about his work, projects, or how to get in touch.";
