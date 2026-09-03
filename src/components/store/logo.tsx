export function Logo({ size = 26, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <path d="M20 3 L9 17 h7 l-4 12 L27 13 h-9 z" fill="var(--accent)" />
      </svg>
      {wordmark && (
        <span
          className="font-display font-extrabold tracking-tight"
          style={{ fontSize: size * 0.77 }}
        >
          softmotors
        </span>
      )}
    </span>
  );
}
