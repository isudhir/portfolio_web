"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Certification } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const { title, issuer, date, url, image } = certification;

  return (
    <GlassCard
      spotlight
      glow="purple"
      className="flex flex-col gap-4 p-6 h-full transition-transform duration-200 hover:-translate-y-1"
    >
      {/* Image */}
      {image && (
        <div className="flex-shrink-0 w-14 h-14 relative">
          <Image
            src={image}
            alt={`${title} badge`}
            fill
            className="object-contain rounded-md"
            sizes="56px"
            unoptimized
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-base text-foreground leading-snug">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{issuer}</p>
        {date && (
          <p className="text-xs text-muted-foreground mt-0.5">
            <time dateTime={date}>{date}</time>
          </p>
        )}
      </div>

      {/* External link */}
      {url && (
        <div className="mt-auto pt-2">
          <MagneticButton
            href={url}
            strength={0.25}
            className="text-xs gap-1.5 px-3 py-1.5 bg-purple/10 text-purple border border-purple/20 hover:bg-purple/20 transition-colors"
            aria-label={`View ${title} credential`}
          >
            <ExternalLink size={12} aria-hidden="true" />
            View Credential
          </MagneticButton>
        </div>
      )}
    </GlassCard>
  );
}
