"use client";

import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import { Download, MessageSquare } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { navigation } from "@/data/navigation";
import { social } from "@/data/social";
import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";

// Render a registry icon by name using createElement to avoid variable-component JSX pattern
function CmdIcon({ name, ...props }: { name: string } & LucideProps) {
  return React.createElement(getIcon(name), props);
}

/**
 * Command palette toggled by Ctrl/Cmd+K.
 * Items: nav sections (scroll-to), social links (open), Download Resume, Open AI chat.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);

  // Register keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const scrollToSection = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const openLink = (href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const downloadResume = () => {
    setOpen(false);
    window.open("/resume.pdf", "_blank");
  };

  const openChat = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("portfolio:open-chat"));
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      overlayClassName={cn(
        "fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      )}
      contentClassName={cn(
        "fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-[201]",
        "w-full max-w-lg",
        "overflow-hidden rounded-2xl glass border border-border/60 shadow-2xl",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      )}
    >
      <CommandInput
        placeholder="Search sections, links, actions…"
        className={cn(
          "w-full border-0 border-b border-border/40 bg-transparent px-4 py-3",
          "text-foreground placeholder:text-muted-foreground",
          "text-sm outline-none focus:outline-none"
        )}
      />
      <CommandList className="max-h-80 overflow-y-auto py-2">
        <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
          No results found.
        </CommandEmpty>

        <CommandGroup
          heading={
            <span className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Navigation
            </span>
          }
        >
          {navigation.map((item) => (
            <CommandItem
              key={item.id}
              value={item.label}
              onSelect={() => scrollToSection(item.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 mx-1 rounded-lg cursor-pointer",
                "text-sm text-foreground",
                "aria-selected:bg-card/80 aria-selected:text-foreground",
                "hover:bg-card/60 transition-colors"
              )}
            >
              <CmdIcon name={item.icon} size={16} className="text-purple shrink-0" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="my-1 mx-3 border-b border-border/30" />

        <CommandGroup
          heading={
            <span className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Social
            </span>
          }
        >
          {social.map((link) => (
            <CommandItem
              key={link.id}
              value={link.label}
              onSelect={() => openLink(link.href)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 mx-1 rounded-lg cursor-pointer",
                "text-sm text-foreground",
                "aria-selected:bg-card/80",
                "hover:bg-card/60 transition-colors"
              )}
            >
              <CmdIcon name={link.icon} size={16} className="text-indigo shrink-0" />
              <span>{link.label}</span>
              <span className="ml-auto text-xs text-muted-foreground truncate max-w-[140px]">
                {link.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "")}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="my-1 mx-3 border-b border-border/30" />

        <CommandGroup
          heading={
            <span className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Actions
            </span>
          }
        >
          <CommandItem
            value="Download Resume"
            onSelect={downloadResume}
            className={cn(
              "flex items-center gap-3 px-3 py-2 mx-1 rounded-lg cursor-pointer",
              "text-sm text-foreground",
              "aria-selected:bg-card/80",
              "hover:bg-card/60 transition-colors"
            )}
          >
            <Download size={16} className="text-cyan shrink-0" />
            <span>Download Resume</span>
          </CommandItem>
          <CommandItem
            value="Open AI Chat"
            onSelect={openChat}
            className={cn(
              "flex items-center gap-3 px-3 py-2 mx-1 rounded-lg cursor-pointer",
              "text-sm text-foreground",
              "aria-selected:bg-card/80",
              "hover:bg-card/60 transition-colors"
            )}
          >
            <MessageSquare size={16} className="text-cyan shrink-0" />
            <span>Open AI Chat</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>

      <div className="border-t border-border/30 px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span>
          <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">↑↓</kbd>{" "}
          navigate
        </span>
        <span>
          <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">↵</kbd>{" "}
          select
        </span>
        <span>
          <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">esc</kbd>{" "}
          close
        </span>
        <span className="ml-auto">
          <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">⌘K</kbd>
        </span>
      </div>
    </CommandDialog>
  );
}
