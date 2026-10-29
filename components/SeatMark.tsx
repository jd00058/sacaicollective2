// A circle of seats with one open, orange seat: the same idea the page ends on
// ("Pull up a chair"), drawn small for the "next event is being planned" card.
// Inside a .seat-host, hovering the host makes room in the circle, sends a wave of
// arrivals around it and lights up the open seat (see globals.css).
const round = (n: number) => Math.round(n * 100) / 100;

export default function SeatMark({ className = "", title }: { className?: string; title?: string }) {
  const seats = 9;
  const r = 15;
  const room = 2.4; // how far each seat slides outward on hover, in viewBox units
  return (
    <svg
      viewBox="0 0 40 40"
      overflow="visible"
      className={`seat-ring ${className}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {Array.from({ length: seats }, (_, i) => {
        const a = (i / seats) * Math.PI * 2 - Math.PI / 2;
        const cx = round(20 + Math.cos(a) * r);
        const cy = round(20 + Math.sin(a) * r);
        const style = {
          "--i": i,
          "--dx": `${round(Math.cos(a) * room)}px`,
          "--dy": `${round(Math.sin(a) * room)}px`,
        } as React.CSSProperties;

        if (i === 0) {
          return (
            <g key={i} className="seat seat-open" style={style}>
              <circle className="seat-ping" cx={cx} cy={cy} r={3.6} fill="none" stroke="var(--color-orange)" strokeWidth={0.5} />
              <circle cx={cx} cy={cy} r={3.6} fill="var(--color-orange)" />
            </g>
          );
        }
        return <circle key={i} className="seat seat-chair" cx={cx} cy={cy} r={2.7} fill="currentColor" style={style} />;
      })}
    </svg>
  );
}
