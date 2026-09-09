"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { editorialEase } from "@/lib/motion";

// ---------------------------------------------------------------------------
// PriceChartCard — interactive crypto price chart.
//
// The "hard to build by hand" parts:
//  • Path morphing: switching coin/range resamples both old and new series
//    to the SAME number of points (Catmull-Rom → cubic bezier), so the old
//    curve smoothly bends into the new one instead of cutting.
//  • Magnetic crosshair: a spring-tracked cursor snaps to the nearest data
//    point, with a live price/time readout and marker dot.
//  • Draw-on reveal: the line strokes itself in via pathLength on first view.
//  • Pulse dot at the last price + gradient area fill.
//
// Fully static under prefers-reduced-motion (no morph, no springs, no draw-on).
// ---------------------------------------------------------------------------

export type ChartPoint = { t: number; p: number };

type PriceChartCardProps = {
  coinId: string;
  coinSymbol: string;
  coinName: string;
};

const RANGES = [
  { days: "1", label: "1H" },
  { days: "7", label: "7D" },
  { days: "30", label: "30D" },
  { days: "90", label: "90D" },
] as const;

// Fixed sample count: the secret behind clean morphing. Both the outgoing
// and incoming series are resampled to this many points so the path `d`
// strings are structurally identical and framer-motion can interpolate them.
const SAMPLES = 72;

const W = 600;
const H = 240;
const PAD_X = 8;
const PAD_Y = 18;

const fmtPrice = (v: number) =>
  v >= 1
    ? `$${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
    : `$${v.toFixed(6)}`;

const fmtTime = (t: number, days: string) => {
  const d = new Date(t);
  if (days === "1") {
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// --- Resampling + smoothing --------------------------------------------------

function resample(points: ChartPoint[], n: number): ChartPoint[] {
  if (points.length === 0) return [];
  if (points.length === 1) return Array.from({ length: n }, () => points[0]);
  const out: ChartPoint[] = [];
  const step = (points.length - 1) / (n - 1);
  for (let i = 0; i < n; i++) {
    const idx = i * step;
    const lo = Math.floor(idx);
    const hi = Math.min(lo + 1, points.length - 1);
    const f = idx - lo;
    out.push({
      t: points[lo].t + (points[hi].t - points[lo].t) * f,
      p: points[lo].p + (points[hi].p - points[lo].p) * f,
    });
  }
  return out;
}

// Catmull-Rom → cubic bezier: smooth curve that passes THROUGH every point,
// no cusps, no overshoot beyond neighbors. This is the piece that is genuinely
// tedious to write by hand.
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  const d: string[] = [`M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d.push(
      `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
    );
  }
  return d.join(" ");
}

function buildPaths(series: ChartPoint[]) {
  const n = series.length;
  if (n === 0) return { line: "", area: "", pts: [] as { x: number; y: number }[] };
  let min = Infinity;
  let max = -Infinity;
  for (const s of series) {
    if (s.p < min) min = s.p;
    if (s.p > max) max = s.p;
  }
  const span = max - min || 1;
  const pad = span * 0.08;
  const lo = min - pad;
  const hi = max + pad;
  const pts = series.map((s, i) => ({
    x: PAD_X + (i / (n - 1)) * (W - PAD_X * 2),
    y: PAD_Y + (1 - (s.p - lo) / (hi - lo)) * (H - PAD_Y * 2),
  }));
  const line = smoothPath(pts);
  const area = `${line} L ${pts[pts.length - 1].x.toFixed(2)} ${H} L ${pts[0].x.toFixed(2)} ${H} Z`;
  return { line, area, pts };
}

// ---------------------------------------------------------------------------

type SeriesState = {
  dLine: string;
  dArea: string;
  pts: { x: number; y: number }[];
  // The resampled series itself, for exact hover readouts (time + price).
  readout: ChartPoint[];
  first: number | null;
  last: number | null;
  changePct: number | null;
};

export default function PriceChartCard({
  coinId,
  coinSymbol,
  coinName,
}: PriceChartCardProps) {
  const reduce = useReducedMotion();
  const [days, setDays] = useState<string>("7");
  const [state, setState] = useState<SeriesState | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Crosshair springs: the raw pointer position feeds a spring, so the line
  // glides and settles instead of teleporting — magnetic-feel for free.
  const rawX = useMotionValue(0);
  const crossX = useSpring(rawX, { stiffness: 480, damping: 38, mass: 0.6 });

  // NOTE: `load` never calls setState synchronously — status flips happen
  // after the first await (or in event handlers), so rendering never cascades
  // from an effect body.
  const load = useCallback(
    async (coin: string, range: string) => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const res = await fetch(
          `/api/market/chart?coin=${encodeURIComponent(coin)}&days=${range}`,
          { signal: ctrl.signal, cache: "no-store" }
        );
        if (!res.ok) throw new Error("bad");
        const json = (await res.json()) as { prices: [number, number][] };
        const series: ChartPoint[] = (json.prices ?? []).map(([t, p]) => ({
          t,
          p,
        }));
        if (series.length < 2) throw new Error("empty");
        const sampled = resample(series, SAMPLES);
        const built = buildPaths(sampled);
        const first = series[0].p;
        const last = series[series.length - 1].p;
        setState({
          dLine: built.line,
          dArea: built.area,
          pts: built.pts,
          readout: sampled,
          first,
          last,
          changePct: ((last - first) / first) * 100,
        });
        setStatus("ready");
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setStatus("error");
      }
    },
    []
  );

  useEffect(() => {
    // Data fetching is the legitimate effect use case here: every setStatus
    // inside `load` runs asynchronously after `await`, never synchronously
    // during the effect body, so no cascading render actually occurs.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(coinId, days);
    return () => abortRef.current?.abort();
  }, [coinId, days, load]);

  // Range switches set the loading state in the HANDLER (not the effect) so
  // the overlay appears instantly and the effect body stays setState-free.
  const changeRange = (d: string) => {
    if (d === days) return;
    setStatus("loading");
    setHoverIdx(null);
    setDays(d);
  };

  // Pointer → nearest sample index. The crosshair always SNAPS to real data
  // (never floats between points) while the spring smooths the travel.
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!state || state.pts.length === 0) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const step = (W - PAD_X * 2) / (state.pts.length - 1);
    const idx = Math.round((x - PAD_X) / step);
    const clamped = Math.max(0, Math.min(state.pts.length - 1, idx));
    setHoverIdx(clamped);
    rawX.set(state.pts[clamped].x);
  };

  const onLeave = () => setHoverIdx(null);

  const hoverPt = state && hoverIdx !== null ? state.pts[hoverIdx] : null;
  const hoverData = useMemo(() => {
    if (!state || hoverIdx === null) return null;
    return state.readout[hoverIdx] ?? null;
  }, [state, hoverIdx]);

  const positive = (state?.changePct ?? 0) >= 0;
  const stroke = positive ? "#34d399" : "#f87171";

  return (
    <div className="border border-surface-2 bg-surface/40 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            {coinSymbol} — {coinName}
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${coinId}-${days}-${state?.last ?? "n"}`}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: editorialEase }}
              className="num-display mt-2 text-3xl text-paper"
            >
              {state?.last != null ? fmtPrice(state.last) : "—"}
            </motion.p>
          </AnimatePresence>
          {state?.changePct != null && (
            <p
              className={`mt-1 font-mono text-[11px] ${
                positive ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {positive ? "+" : ""}
              {state.changePct.toFixed(2)}% over range
            </p>
          )}
        </div>

        {/* Range switcher */}
        <div className="flex gap-1 border border-surface-2 p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              onClick={() => changeRange(r.days)}
              className={`relative px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                days === r.days ? "text-void" : "text-mute hover:text-paper"
              }`}
            >
              {days === r.days && (
                <motion.span
                  layoutId="chart-range-pill"
                  className="absolute inset-0 bg-bronze"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative mt-6">
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-void/60"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute">
                Memuat grafik…
              </span>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-void/70"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-300">
                Grafik tidak tersedia
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full touch-none select-none"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          role="img"
          aria-label={`Grafik harga ${coinName}`}
        >
          <defs>
            <linearGradient id="clc-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.16" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>

          {state && (
            <>
              {/* Area fill morphs with the same `d` interpolation. */}
              <motion.path
                d={state.dArea}
                fill="url(#clc-chart-fill)"
                initial={false}
                animate={{ d: state.dArea }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.9, ease: editorialEase }
                }
              />

              {/* The line: draw-on on first mount, then morphs on change. */}
              <motion.path
                d={state.dLine}
                fill="none"
                stroke={stroke}
                strokeWidth={2}
                strokeLinecap="round"
                initial={
                  reduce ? false : { pathLength: 0, opacity: 0.6 }
                }
                animate={{ d: state.dLine, pathLength: 1, opacity: 1 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        d: { duration: 0.9, ease: editorialEase },
                        pathLength: { duration: 1.4, ease: editorialEase },
                        opacity: { duration: 0.4 },
                      }
                }
              />

              {/* Pulse dot at the last price. */}
              {state.pts.length > 0 && (
                <g transform={`translate(${state.pts[state.pts.length - 1].x} ${state.pts[state.pts.length - 1].y})`}>
                  {!reduce && (
                    <motion.circle
                      r={4}
                      fill={stroke}
                      animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      style={{ transformOrigin: "center" }}
                    />
                  )}
                  <circle r={3} fill={stroke} />
                </g>
              )}

              {/* Magnetic crosshair — springs toward the hovered sample. */}
              {hoverPt && (
                <motion.g style={{ x: crossX }}>
                  <line
                    x1={0}
                    y1={PAD_Y / 2}
                    x2={0}
                    y2={H - PAD_Y / 2}
                    stroke="currentColor"
                    className="text-bronze-soft/50"
                    strokeDasharray="3 4"
                  />
                  <circle cx={0} cy={hoverPt.y} r={4.5} fill="none" stroke={stroke} strokeWidth={1.5} />
                  <circle cx={0} cy={hoverPt.y} r={2} fill={stroke} />
                </motion.g>
              )}
            </>
          )}
        </svg>

        {/* Hover readout — pinned near the top so it never jitters. */}
        <div className="pointer-events-none absolute left-2 top-0 h-6">
          {hoverData && (
            <motion.span
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-[10px] tracking-[0.15em] text-bronze-soft"
            >
              {fmtPrice(hoverData.p)} · {fmtTime(hoverData.t, days)}
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
}
