import type { ReactNode } from "react";

export type IconProps = { size?: number; className?: string; strokeWidth?: number };

function Svg({
  size = 20,
  strokeWidth = 2,
  className,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ChevronDown(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 14}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function ChevronRight(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 16}>
      <path d="M9 6l6 6-6 6" />
    </Svg>
  );
}

export function ChevronLeft(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 16}>
      <path d="M15 6l-6 6 6 6" />
    </Svg>
  );
}

export function Search(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </Svg>
  );
}

export function Heart(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 20s-7-4.5-9.5-9C1 8 3 4.5 6.5 4.5 9 4.5 12 7 12 7s3-2.5 5.5-2.5C21 4.5 23 8 21.5 11 19 15.5 12 20 12 20z" />
    </Svg>
  );
}

export function User(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
    </Svg>
  );
}

export function Check(p: IconProps) {
  return (
    <Svg {...p} strokeWidth={p.strokeWidth ?? 2.6}>
      <path d="M20 6L9 17l-5-5" />
    </Svg>
  );
}

export function Shield(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    </Svg>
  );
}

export function ShieldCheck(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  );
}

export function Video(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="M15 10l6-3v10l-6-3z" />
    </Svg>
  );
}

export function Whatsapp(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
      <path d="M8.5 8.5c0 4 3 7 7 7l1.3-2-2.2-1-.9.9c-1.2-.5-2.2-1.5-2.7-2.7l.9-.9-1-2.2z" />
    </Svg>
  );
}

export function Tag(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 13V5a1 1 0 0 1 1-1h8l7 7-9 9z" />
      <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function Rotate3d(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 12a8 8 0 1 0 3-6" />
      <path d="M7 3v4h4" />
    </Svg>
  );
}

export function MapPin(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function Sliders(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </Svg>
  );
}

export function ArrowUpDown(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 4v16M7 4L4 7M7 4l3 3M17 20V4M17 20l-3-3M17 20l3-3" />
    </Svg>
  );
}

export function Flag(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 3v18M6 4h11l-2 4 2 4H6" />
    </Svg>
  );
}

export function CreditCard(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </Svg>
  );
}

export function RefreshTrade(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 7h10l3 5-3 5H7l-3-5z" />
      <path d="M9 12h6" />
    </Svg>
  );
}
