import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const VARIANTS = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  ghost: "bg-surface text-ink border border-line-strong hover:bg-[#f8fafc]",
  wa: "bg-wa text-white hover:brightness-95",
  dark: "bg-ink text-white hover:bg-ink/90",
} as const;

type Variant = keyof typeof VARIANTS;

const baseCls =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const sizeCls = {
  md: "px-[22px] py-[13px] text-[15px]",
  sm: "px-[18px] py-2.5 text-sm",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  full,
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: "md" | "sm"; full?: boolean }) {
  return (
    <button
      className={`${baseCls} ${VARIANTS[variant]} ${sizeCls[size]} ${full ? "w-full" : ""} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  full,
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: "md" | "sm";
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      className={`${baseCls} ${VARIANTS[variant]} ${sizeCls[size]} ${full ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-line bg-surface shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-subtle">
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-[22px] font-extrabold tracking-tight">{children}</h2>;
}
