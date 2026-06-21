"use client";

import type { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type GradientTextOwnProps<E extends ElementType> = {
  /** Tag or component to render. Defaults to "span". */
  as?: E;
  className?: string;
  children?: React.ReactNode;
  /** Additional animation class, e.g. "animate-gradient" */
  animated?: boolean;
};

export type GradientTextProps<E extends ElementType = "span"> =
  GradientTextOwnProps<E> &
    Omit<ComponentPropsWithoutRef<E>, keyof GradientTextOwnProps<E>>;

export function GradientText<E extends ElementType = "span">({
  as,
  className,
  children,
  animated = true,
  ...props
}: GradientTextProps<E>) {
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag
      className={cn(
        "text-gradient",
        animated && "animate-gradient",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
