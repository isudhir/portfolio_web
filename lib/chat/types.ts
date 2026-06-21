export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatClient {
  send(messages: ChatMessage[], signal?: AbortSignal): AsyncIterable<string>;
}
