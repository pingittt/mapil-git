type Variant = "a" | "b" | "c" | "d" | "e" | "f" | "hero";

type DocumentPlateProps = {
  variant?: Variant;
  caption?: string;
  showMark?: boolean;
  className?: string;
};

// Deterministic "greeked" rule-line widths per variant, standing in for
// justified paragraph text on an abstracted statute page. Fixed arrays
// (no Math.random) so server and client output always match exactly.
const LINE_SETS: Record<Variant, number[]> = {
  hero: [86, 62, 74, 45, 68],
  a: [70, 48, 60],
  b: [55, 80, 40, 65],
  c: [64, 40],
  d: [78, 52, 68, 36, 58],
  e: [46, 72, 58],
  f: [60, 38, 66, 50],
};

const GRADIENTS: Record<Variant, string> = {
  hero: "linear-gradient(150deg, #11161D 0%, #0B0F14 45%, #16202A 100%)",
  a: "linear-gradient(160deg, #11161D 0%, #0A0D12 100%)",
  b: "linear-gradient(200deg, #151B24 0%, #0A0D12 70%)",
  c: "linear-gradient(135deg, #131922 0%, #0C1016 100%)",
  d: "linear-gradient(170deg, #17222C 0%, #0A0D12 100%)",
  e: "linear-gradient(145deg, #11161D 0%, #0D1319 100%)",
  f: "linear-gradient(210deg, #141A22 0%, #0A0D12 100%)",
};

/**
 * The recurring visual signature used everywhere a photograph would
 * normally go: an abstracted "document plate" — ruled lines standing in
 * for greeked statute text, a corner registration mark like a printer's
 * crop mark, and paper grain. Deliberately not a stock photo (nothing to
 * license, nothing that can 404) and deliberately not a gradient blob
 * (the ruled lines and crop mark keep it tied to the subject: law as
 * document).
 */
export default function DocumentPlate({
  variant = "a",
  caption,
  showMark = false,
  className = "",
}: DocumentPlateProps) {
  const lines = LINE_SETS[variant];

  return (
    <div
      className={`bg-grain relative overflow-hidden ${className}`}
      style={{ background: GRADIENTS[variant] }}
    >
      {/* corner registration marks — printer's crop-mark motif */}
      <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-paper/25" />
      <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-paper/25" />
      <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-paper/25" />
      <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-paper/25" />

      {/* abstracted ruled text block */}
      <div className="absolute inset-0 flex flex-col items-start justify-center gap-2.5 px-[18%] py-10">
        {lines.map((w, i) => (
          <span
            key={i}
            className="h-[3px] rounded-full bg-paper/10"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>

      {showMark && (
        <span
          aria-hidden="true"
          className="font-display absolute -bottom-10 -right-4 select-none text-[13rem] leading-none text-paper/5"
        >
          §
        </span>
      )}

      {caption && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40">
          {caption}
        </span>
      )}
    </div>
  );
}
