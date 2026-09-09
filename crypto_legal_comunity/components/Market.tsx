"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import PriceChartCard from "@/components/ui/PriceChartCard";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import SplitText from "@/components/ui/SplitText";
import type { MarketData } from "@/lib/market";
import { marketCoins } from "@/lib/market";
import { editorialEase } from "@/lib/motion";
import { useSound } from "@/lib/sound/use-sound";

type Status = "loading" | "error" | "empty" | "ready";

const num = (v: number | null | undefined, digits = 2) => {
  if (v === null || v === undefined || Number.isNaN(v)) return "—";
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`;
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}K`;
  return `$${v.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
};

const formatPrice = (v: number | null | undefined) => {
  if (v === null || v === undefined || Number.isNaN(v)) return "—";
  if (v >= 1) return `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${v.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 6 })}`;
};

export default function Market() {
  const { play } = useSound();
  const [data, setData] = useState<MarketData | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  // Which coin's chart is open (null = chart hidden entirely).
  const [chartCoin, setChartCoin] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [flash, setFlash] = useState<Record<string, boolean>>({});
  const reduce = useReducedMotion();
  const dataRef = useRef<MarketData | null>(null);

  // Compare incoming prices with the previous snapshot and flash the tiles
  // whose price actually changed — a one-shot highlight, never a blink loop.
  const applyData = useCallback(
    (json: MarketData) => {
      const prev = dataRef.current;
      if (prev) {
        const changed: Record<string, boolean> = {};
        for (const coin of marketCoins) {
          const before = prev[coin.id]?.usd;
          const after = json[coin.id]?.usd;
          if (
            typeof before === "number" &&
            typeof after === "number" &&
            before !== after
          ) {
            changed[coin.id] = true;
          }
        }
        if (Object.keys(changed).length > 0) {
          setFlash(changed);
          window.setTimeout(() => setFlash({}), 700);
        }
      }
      dataRef.current = json;
      setData(json);
      setStatus("ready");
    },
    []
  );

  const runFetch = useCallback(
    async (withLoading: boolean) => {
      if (withLoading) setStatus("loading");
      try {
        const res = await fetch("/api/market", { cache: "no-store" });
        if (!res.ok) throw new Error("bad");
        const json = (await res.json()) as MarketData;
        if (!json || Object.keys(json).length === 0) {
          setStatus("empty");
        } else {
          applyData(json);
        }
      } catch {
        // Soft error cue so a failed refresh is heard, not just seen.
        play("error");
        setStatus("error");
      }
    },
    [applyData, play]
  );

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/market", { cache: "no-store" });
        if (cancelled) return;
        if (!res.ok) throw new Error("bad");
        const json = (await res.json()) as MarketData;
        if (cancelled) return;
        if (!json || Object.keys(json).length === 0) {
          setStatus("empty");
        } else {
          applyData(json);
        }
      } catch {
        if (!cancelled) {
          // Same cue on the initial-load failure path.
          play("error");
          setStatus("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [applyData, play]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await runFetch(true);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <section
      id="market"
      className="scroll-mt-20 border-t border-surface-2 py-28 sm:py-36"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionMark clause="Ps. 13" label="Market" />
            <SplitText
              as="h2"
              text="Crypto Market Watch"
              className="font-display mt-8 text-4xl tracking-tight text-paper sm:text-5xl"
            />
          </div>
          <Reveal delay={0.2}>
            <button
              type="button"
              onClick={() => {
                play("click");
                void handleRefresh();
              }}
              disabled={status !== "ready" || refreshing}
              className="inline-flex items-center gap-2 border border-paper/25 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-bronze hover:text-bronze active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Muat ulang data market"
            >
              <RefreshCw
                aria-hidden="true"
                className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </Reveal>
        </div>

        <div className="mt-16">
          <AnimatePresence mode="wait">
            {status === "loading" && <MarketSkeleton key="loading" />}

            {status === "error" && <MarketError key="error" onRetry={handleRefresh} />}

            {status === "empty" && <MarketEmpty key="empty" onRetry={handleRefresh} />}

            {status === "ready" && data && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-px border border-surface-2 bg-surface-2 sm:grid-cols-2 lg:grid-cols-5"
              >
                {marketCoins.map((coin, i) => {
                  const quote = data[coin.id];
                  const change = quote?.usd_24h_change;
                  const positive = change !== null && change !== undefined && change >= 0;
                  const active = chartCoin === coin.id;
                  return (
                    <motion.button
                      key={coin.id}
                      type="button"
                      onClick={() => {
                        // Toggle: same tile again closes the chart.
                        play("click");
                        setChartCoin((prev) => (prev === coin.id ? null : coin.id));
                      }}
                      aria-pressed={active}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className={`group cursor-pointer bg-void p-6 text-left transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:bg-surface/60 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.85)] ${
                        active ? "bg-surface/70 outline outline-1 outline-bronze/50" : ""
                      } ${flash[coin.id] ? "bg-surface/70" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                          {coin.symbol}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-bronze/80" />
                      </div>

                      <span className="mt-4 block font-display text-lg text-paper">
                        {coin.name}
                      </span>

                      {/* Price: quiet crossfade on change, brief bronze flash
                          when the tile's value actually moved. */}
                      <motion.p
                        key={formatPrice(quote?.usd)}
                        initial={reduce ? { opacity: 1 } : { opacity: 0.35 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: reduce ? 0.1 : 0.35, ease: editorialEase }}
                        className={`num-display mt-2 text-2xl ${
                          flash[coin.id] ? "text-bronze-soft" : "text-paper"
                        }`}
                      >
                        {formatPrice(quote?.usd)}
                      </motion.p>

                      <p
                        className={`mt-1 font-mono text-[11px] transition-colors duration-500 ${
                          positive ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {change === null || change === undefined
                          ? "—"
                          : `${positive ? "+" : ""}${change.toFixed(2)}% (24h)`}
                      </p>

                      <span className="mt-5 grid grid-cols-2 gap-y-3 border-t border-surface-2 pt-4">
                        <span className="block">
                          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-mute/60">
                            Market Cap
                          </span>
                          <span className="mt-1 block text-xs text-paper/80">
                            {num(quote?.usd_market_cap, 0)}
                          </span>
                        </span>
                        <span className="block">
                          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-mute/60">
                            Volume (24h)
                          </span>
                          <span className="mt-1 block text-xs text-paper/80">
                            {num(quote?.usd_24h_vol, 0)}
                          </span>
                        </span>
                      </span>

                      {/* Affordance hint — the tile opens its chart. */}
                      <span
                        className={`mt-4 block font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                          active ? "text-bronze-soft" : "text-mute/0 group-hover:text-mute/70"
                        }`}
                      >
                        {active ? "Tutup grafik ×" : "Lihat grafik →"}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive chart — expands under the tile grid when a coin is
            selected. Height animates so the page never jumps. */}
        <AnimatePresence initial={false} mode="wait">
          {chartCoin && status === "ready" && (
            <motion.div
              key={chartCoin}
              initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: editorialEase }}
              className="overflow-hidden"
            >
              <div className="mt-8">
                <PriceChartCard
                  coinId={chartCoin}
                  coinSymbol={
                    marketCoins.find((c) => c.id === chartCoin)?.symbol ?? ""
                  }
                  coinName={
                    marketCoins.find((c) => c.id === chartCoin)?.name ?? ""
                  }
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal delay={0.1} className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute/50">
            Data live dari CoinGecko — nilai dapat berubah sewaktu-waktu. Klik
            koin untuk membuka grafik harga interaktif.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function MarketSkeleton() {
  return (
    <motion.div
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="grid gap-px border border-surface-2 bg-surface-2 sm:grid-cols-2 lg:grid-cols-5"
      aria-label="Memuat data market"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-void p-6">
          <div className="clc-skeleton h-3 w-12" />
          <div className="clc-skeleton mt-4 h-5 w-24" />
          <div className="clc-skeleton mt-2 h-7 w-20" />
          <div className="clc-skeleton mt-1 h-3 w-16" />
          <div className="mt-5 flex gap-3 border-t border-surface-2 pt-4">
            <div className="clc-skeleton h-3 w-16" />
            <div className="clc-skeleton h-3 w-16" />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function MarketError({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="border border-surface-2 bg-surface/40 p-10 text-center"
    >
      <p className="font-display text-xl text-paper">
        Market data sedang tidak tersedia.
      </p>
      <p className="mt-3 text-sm text-mute">
        Silakan coba lagi beberapa saat.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 border border-paper/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:border-bronze hover:text-bronze"
      >
        <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
        Coba Lagi
      </button>
    </motion.div>
  );
}

function MarketEmpty({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="border border-surface-2 bg-surface/40 p-10 text-center"
    >
      <p className="font-display text-xl text-paper">
        Belum ada data market untuk ditampilkan.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 border border-paper/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:border-bronze hover:text-bronze"
      >
        <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
        Muat Ulang
      </button>
    </motion.div>
  );
}
