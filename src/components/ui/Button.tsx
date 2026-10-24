import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "ghost-light" | "ghost-dark";

const variantClasses: Record<Variant, string> = {
  solid:
    "bg-leaf text-navy-ink hover:bg-leaf/90 border border-leaf",
  "ghost-light":
    "bg-transparent text-paper border border-paper/70 hover:bg-paper/10",
  "ghost-dark":
    "bg-transparent text-navy-ink border border-navy-ink/40 hover:bg-navy-ink/5",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  href,
  variant = "solid",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans font-semibold text-sm tracking-wide transition-colors duration-150 ${variantClasses[variant]} ${className}`;

  const isExternal = href.startsWith("http") || href.startsWith("https://wa.me");

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
