import { NextResponse } from "next/server";
import type { MarketData } from "@/lib/market";
import { MARKET_COIN_IDS, MARKET_ENDPOINT } from "@/lib/market";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = new URL(MARKET_ENDPOINT);
  url.searchParams.set("ids", MARKET_COIN_IDS);
  url.searchParams.set("vs_currencies", "usd");
  url.searchParams.set("include_24hr_change", "true");
  url.searchParams.set("include_market_cap", "true");
  url.searchParams.set("include_24hr_vol", "true");

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
        { error: "Market data sedang tidak tersedia." },
        { status: res.status }
      );
    }

    const data = (await res.json()) as MarketData;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Market data sedang tidak tersedia." },
      { status: 502 }
    );
  }
}
