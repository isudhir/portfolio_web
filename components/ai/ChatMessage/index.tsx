"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/lib/chat";

interface CodeBlockProps {
  code: string;
  language?: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently ignore clipboard errors
    }
  };

  return (
    <div className="relative my-2 rounded-lg overflow-hidden border border-white/10">
      {language && (
        <div className="flex items-center justify-between px-3 py-1 bg-white/5 border-b border-white/10">
          <span className="text-xs text-muted-foreground font-mono">{language}</span>
          <button
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? (
              <Check className="size-3 text-green-400" />
            ) : (
              <Copy className="size-3" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      {!language && (
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="absolute top-2 right-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors bg-background/80 rounded px-1.5 py-0.5"
        >
          {copied ? (
            <Check className="size-3 text-green-400" />
          ) : (
            <Copy className="size-3" />
          )}
        </button>
      )}
      <pre className="p-3 overflow-x-auto text-sm font-mono bg-black/30">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/** Highlighted code block using shiki (loaded lazily to keep bundle small). */
function ShikiCodeBlock({ code, language }: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    if (!language) return;
    let cancelled = false;
    (async () => {
      try {
        const { codeToHtml } = await import("shiki");
        const html = await codeToHtml(code, {
          lang: language,
          theme: "github-dark",
        });
        if (!cancelled) setHighlighted(html);
      } catch {
        // Fall back to plain rendering if shiki can't handle the language
      }
    })();
    return () => { cancelled = true; };
  }, [code, language]);

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently ignore
    }
  };

  if (highlighted) {
    return (
      <div className="relative my-2 rounded-lg overflow-hidden border border-white/10 group">
        <div className="flex items-center justify-between px-3 py-1 bg-white/5 border-b border-white/10">
          <span className="text-xs text-muted-foreground font-mono">{language}</span>
          <button
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? (
              <Check className="size-3 text-green-400" />
            ) : (
              <Copy className="size-3" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div
          className="[&>pre]:p-3 [&>pre]:overflow-x-auto [&>pre]:text-sm [&>pre]:!bg-transparent text-sm"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    );
  }

  return <CodeBlock code={code} language={language} />;
}

export interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
          isUser
            ? "bg-purple/20 border border-purple/30 text-foreground ml-4"
            : "glass border border-white/10 text-foreground mr-4"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <div
            className="prose prose-invert prose-sm max-w-none break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
            aria-live={isStreaming ? "polite" : undefined}
            aria-atomic={isStreaming ? "false" : undefined}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className ?? "");
                  const language = match?.[1];
                  const code = String(children).replace(/\n$/, "");
                  const isBlock = className?.includes("language-");

                  if (isBlock) {
                    return <ShikiCodeBlock code={code} language={language} />;
                  }

                  return (
                    <code
                      className="rounded bg-white/10 px-1 py-0.5 font-mono text-xs"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre({ children }) {
                  // Rendered by ShikiCodeBlock above; just pass through
                  return <>{children}</>;
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
            {isStreaming && message.content === "" && (
              <span className="inline-flex gap-1 items-center">
                <span className="size-1.5 rounded-full bg-current animate-bounce [animation-delay:0ms]" />
                <span className="size-1.5 rounded-full bg-current animate-bounce [animation-delay:150ms]" />
                <span className="size-1.5 rounded-full bg-current animate-bounce [animation-delay:300ms]" />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
