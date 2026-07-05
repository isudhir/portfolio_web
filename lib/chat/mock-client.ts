import type { ChatClient, ChatMessage } from './types';

/** Canned first-person answers keyed by a normalised question pattern. */
const CANNED_ANSWERS: Record<string, string> = {
  'tell me about yourself':
    "I'm Sudhir Kumar, a Software Engineer II at FlavorCloud. I have 5+ years of experience building scalable backend systems and full-stack web applications. My core stack is Node.js, TypeScript, Angular, and React, backed by MongoDB, MySQL, and Redis. I'm also deeply interested in AI — integrating language models and building AI-assisted workflows. I enjoy turning complex problems into clean, maintainable software.",

  'what projects have you built':
    "I've built a range of full-stack and AI-integrated projects. Highlights include microservice-based REST APIs with Node.js and TypeScript, Angular and React frontends with real-time features, data pipelines using Redis queues, and AI workflow tools that connect LLMs to business processes. I'm always experimenting with new ideas — check the Projects section to see the work in detail.",

  'what ai technologies do you use':
    "I work with OpenAI's API and Anthropic's Claude for language model integrations, build agentic workflows that chain LLM calls with tool use, and use vector embeddings for semantic search. I'm comfortable with prompt engineering, RAG (retrieval-augmented generation) patterns, and wrapping AI capabilities into production-grade Node.js services.",

  'what is your experience':
    "I'm currently a Software Engineer II at FlavorCloud, where I design and ship backend services that power international logistics workflows. Before that I worked at PatientBond and Upfront Healthcare, building healthcare engagement platforms. Across these roles I've led API design, improved system performance, mentored team members, and shipped features used by thousands of users.",

  'how can i contact you':
    "The best ways to reach me are by email at isudhir390@gmail.com or via LinkedIn at linkedin.com/in/sudhir-here/. You can also find my open-source work on GitHub. I'm always open to interesting conversations about software, AI, or new opportunities.",

  'what are you working on currently':
    "At FlavorCloud I'm building robust backend services for global shipping and logistics. Outside of work I'm deepening my AI/ML knowledge, contributing to open-source tooling, and experimenting with agentic AI systems. This portfolio site is one of my recent personal projects — built with Next.js, TypeScript, Framer Motion, and a streamed AI chat layer.",
};

const FALLBACK_ANSWER =
  "Great question! Chatbot is still in development. Falling back to a default response: I'm Sudhir Kumar, a Software Engineer II specialising in Node.js, TypeScript, and AI integrations. Feel free to ask me about my projects, experience, or how to get in touch.";

function normalise(text: string): string {
  return text.toLowerCase().replace(/[?!.,]/g, '').trim();
}

function findAnswer(messages: ChatMessage[]): string {
  // Use the last user message as the query
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUser) return FALLBACK_ANSWER;

  const norm = normalise(lastUser.content);

  for (const [key, answer] of Object.entries(CANNED_ANSWERS)) {
    if (norm.includes(key) || key.includes(norm)) {
      return answer;
    }
  }

  return FALLBACK_ANSWER;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockChatClient implements ChatClient {
  readonly kind = 'mock' as const;

  /**
   * @param wordDelayMs - Delay between yielded words in ms (default: random 30-60ms).
   *                      Pass 0 in tests to skip delays.
   */
  constructor(private readonly wordDelayMs?: number) {}

  async *send(
    messages: ChatMessage[],
    signal?: AbortSignal,
  ): AsyncIterable<string> {
    if (signal?.aborted) return;

    const answer = findAnswer(messages);
    const words = answer.split(' ');

    for (let i = 0; i < words.length; i++) {
      if (signal?.aborted) return;

      // Yield each word followed by a space (except the last word)
      yield i < words.length - 1 ? words[i] + ' ' : words[i];

      // Small delay to simulate streaming (~30-60ms per word by default)
      const ms =
        this.wordDelayMs !== undefined
          ? this.wordDelayMs
          : 30 + Math.random() * 30;
      if (ms > 0) await delay(ms);
    }
  }
}
