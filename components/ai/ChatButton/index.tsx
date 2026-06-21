"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { ChatWindow } from "@/components/ai/ChatWindow";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

/** Dispatched by the command palette to open the chat widget. */
const OPEN_CHAT_EVENT = "portfolio:open-chat";

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = useReducedMotionSafe();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Listen for the cross-component open event (dispatched by command palette)
  useEffect(() => {
    const handler = () => open();
    window.addEventListener(OPEN_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler);
  }, [open]);

  // Animation variants — skip when reduced motion is preferred
  const windowVariants = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.92, y: 16 },
        animate: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: "spring" as const, stiffness: 400, damping: 30 },
        },
        exit: {
          opacity: 0,
          scale: 0.92,
          y: 16,
          transition: { duration: 0.18 },
        },
      };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      aria-label="AI Chat widget"
    >
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            variants={windowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout={!reducedMotion}
            className="origin-bottom-right"
          >
            <ChatWindow onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={toggle}
        aria-label={isOpen ? "Close chat" : "Open AI chat"}
        aria-expanded={isOpen}
        whileHover={reducedMotion ? {} : { scale: 1.08 }}
        whileTap={reducedMotion ? {} : { scale: 0.95 }}
        className={cn(
          "size-14 rounded-2xl flex items-center justify-center",
          "glass border border-white/20",
          "shadow-lg shadow-black/40",
          "transition-colors duration-200",
          isOpen
            ? "border-purple/40 bg-purple/10"
            : "hover:border-purple/30 hover:bg-purple/5"
        )}
        style={
          isOpen
            ? { boxShadow: "0 0 24px var(--accent-purple)33" }
            : undefined
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
            >
              <X className="size-6 text-foreground" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -90 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <MessageCircle
                className="size-6"
                style={{ color: "var(--accent-purple)" }}
              />
              <Sparkles
                className="absolute -top-1 -right-1 size-3"
                style={{ color: "var(--accent-cyan)" }}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// Named export for documentation / test imports
export { ChatButton as AIChatButton };

// Default export so Task 18 can: import ChatButton from '@/components/ai/ChatButton'
export default ChatButton;
