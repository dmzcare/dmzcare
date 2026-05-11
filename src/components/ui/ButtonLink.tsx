import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-dmz-accent text-dmz-dark hover:bg-[#b8e002] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dmz-accent",
  secondary:
    "border border-dmz-border bg-dmz-white text-dmz-dark hover:border-dmz-dark/20 hover:bg-dmz-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dmz-dark",
  ghost:
    "text-dmz-dark hover:bg-dmz-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dmz-dark",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      className={`inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-tight transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
