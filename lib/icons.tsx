import type { ComponentType } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";

/**
 * Icon registry.
 *
 * lucide-react v1 removed brand/logo glyphs (Github, Linkedin, ...). We provide
 * inline brand SVGs for those and fall back to lucide for everything else. All
 * components accept lucide-compatible props (`size`, `className`, `aria-hidden`).
 */

type BrandProps = Omit<LucideProps, "ref">;

function brand(path: React.ReactNode): ComponentType<BrandProps> {
  function BrandIcon({ size = 24, className, ...rest }: BrandProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...rest}
      >
        {path}
      </svg>
    );
  }
  return BrandIcon;
}

const GithubIcon = brand(
  <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.02 2.81-.02 3.19 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
);

const LinkedinIcon = brand(
  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
);

const BRAND: Record<string, ComponentType<BrandProps>> = {
  Github: GithubIcon,
  GitHub: GithubIcon,
  Linkedin: LinkedinIcon,
  LinkedIn: LinkedinIcon,
};

/** Resolve an icon by name. Always returns a renderable component. */
export function getIcon(name: string): ComponentType<BrandProps> {
  if (BRAND[name]) return BRAND[name];
  const icons = LucideIcons as unknown as Record<string, LucideIcon | undefined>;
  return icons[name] ?? LucideIcons.Circle;
}
