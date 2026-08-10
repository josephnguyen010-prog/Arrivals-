interface StarsProps {
  value: number | null;
  /** Font size in px; the stars scale from it. */
  size?: number;
}

/**
 * Five glyphs in the rule colour with a clipped copy in the accent over the
 * top, so half stars are a width rather than a separate glyph.
 */
export function Stars({ value, size }: StarsProps) {
  if (value === null) {
    return <span className="stars none" aria-label="Not rated" />;
  }
  return (
    <span
      className="stars"
      style={{ ["--v" as string]: value, ...(size ? { fontSize: `${size}px` } : {}) }}
      aria-label={`${value} out of 5 stars`}
    >
      <i />
    </span>
  );
}
