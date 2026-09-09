import { NextResponse } from "next/server";
import { MARKET_API_BASE } from "@/lib/market";
import { marketCoins } from "@/lib/market";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// GET /api/market/chart?coin=bitcoin&days=30
//
// Thin proxy to CoinGecko's /coins/{id}/market_chart endpoint so the browser
// never talks to CoinGecko directly (no CORS noise, key stays server-side).
// `coin` and `days` are whitelisted — anything outside the list 404s instead
// of being forwarded, so the route can't be abused as an open proxy.
// ---------------------------------------------------------------------------

const COIN_IDS = new Set(marketCoins.map((c) => c.id));
const ALLOWED_DAYS = new Set(["1", "7", "30", "90"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coin = searchParams.get("coin") ?? "";
  const days = searchParams.get("days") ?? "7";

  if (!COIN_IDS.has(coin)) {
    return NextResponse.json(
      { error: "Coin tidak didukung." },
      { status: 400 }
    );
  }
  if (!ALLOWED_DAYS.has(days)) {
    return NextResponse.json(
      { error: "Range tidak didukung." },
      { status: 400 }
    );
  }

  const url = new URL(`${MARKET_API_BASE}/coins/${encodeURIComponent(coin)}/market_chart`);
  url.searchParams.set("vs_currency", "usd");
  url.searchParams.set("days", days);

  try {
    const apiKey = process.env.MARKET_API_KEY;
    const res = await fetch(url.toString(), {
      headers: apiKey
        ? { "x-cg-demo-api-key": apiKey }
        : { accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Data grafik sedang tidak tersedia." },
        { status: res.status }
      );
    }

    const data = (await res.json()) as {
      prices: [number, number][];
    };

    // Keep the payload small: the chart only needs the timestamp + price.
    return NextResponse.json({
      coin,
      days,
      prices: data.prices ?? [],
    });
  } catch {
    return NextResponse.json(
      { error: "Data grafik sedang tidak tersedia." },
      { status: 502 }
    );
  }
}
