// The AI Collective "C" mark. The white PNG is used as a mask, so the mark takes the
// current text color: cream in the nav and footer, orange wherever it should pop.
const mask = "url(/brand/aic-mark.png) center / contain no-repeat";

export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block aspect-[512/618] shrink-0 bg-current ${className}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}
