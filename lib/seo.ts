import type { Metadata } from "next";
import { social } from "@/data/social";

export const siteConfig = {
  name: "Sudhir Kumar",
  jobTitle: "Software Engineer II",
  title: "Sudhir Kumar — Software Engineer II | Full Stack & AI Systems",
  description:
    "Software Engineer II with 5+ years building scalable applications, APIs, microservices and AI-powered workflows. Node.js, TypeScript, Angular, React, Next.js, and agentic AI systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:5000",
} as const;

export function buildMetadata(): Metadata {
  const { name, title, description, url } = siteConfig;
  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s — ${name}`,
    },
    description,
    applicationName: name,
    authors: [{ name }],
    creator: name,
    keywords: [
      "Sudhir Kumar",
      "Software Engineer",
      "Full Stack Developer",
      "Node.js",
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "AI Engineer",
      "Agentic AI",
      "Microservices",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: name,
      // OG image auto-injected by app/opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // Twitter image auto-injected by app/opengraph-image.tsx
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: { icon: "/favicon.ico" },
  };
}

/** JSON-LD Person schema for rich results. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: social
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
  };
}
