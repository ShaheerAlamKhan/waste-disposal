interface BrandMarkProps {
  className?: string;
}

/**
 * ReCircuit logo mark — two curved arrows circling a circuit-chip node:
 * electronics looping back into use.
 */
export default function BrandMark({ className = 'h-5 w-5' }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* upper looping arrow */}
        <path d="M6 8.5A7 7 0 0 1 18.5 9.3" />
        <path d="M18.9 5.6 18.7 9.6 14.8 9" />
        {/* lower looping arrow */}
        <path d="M18 15.5A7 7 0 0 1 5.5 14.7" />
        <path d="M5.1 18.4 5.3 14.4 9.2 15" />
      </g>
      {/* circuit-chip node */}
      <rect x="9.4" y="9.4" width="5.2" height="5.2" rx="1.4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
        <path d="M12 7.6v1.8M12 14.6v1.8M7.6 12h1.8M14.6 12h1.8" />
      </g>
    </svg>
  );
}
