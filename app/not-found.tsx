"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveLeft } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span
          className="glitch text-8xl font-extrabold tracking-tight sm:text-9xl"
          data-text="404"
        >
          <GradientText as="span">404</GradientText>
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="max-w-md text-muted-foreground"
      >
        This page drifted off into the void. Let&apos;s get you back to familiar space.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/10 px-5 py-2.5 text-sm font-semibold text-purple transition-colors hover:bg-purple/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
        >
          <MoveLeft size={16} aria-hidden="true" />
          Back home
        </Link>
      </motion.div>
    </main>
  );
}
