// The brand mark: a circle of seats with one open, orange seat. It's the same idea
// the page ends on ("Pull up a chair"), shrunk down to logo size.
export default function SeatMark({ className = "", title }: { className?: string; title?: string }) {
  const seats = 9;
  const r = 15;
  return (
    <svg viewBox="0 0 40 40" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {Array.from({ length: seats }, (_, i) => {
        const a = (i / seats) * Math.PI * 2 - Math.PI / 2;
        const open = i === 0;
        return (
          <circle
            key={i}
            cx={Math.round((20 + Math.cos(a) * r) * 100) / 100}
            cy={Math.round((20 + Math.sin(a) * r) * 100) / 100}
            r={open ? 3.6 : 2.7}
            fill={open ? "var(--color-orange)" : "currentColor"}
          />
        );
      })}
    </svg>
  );
}
