// Crypto market configuration and types.
// Uses the public CoinGecko free endpoint (no API key required for the
// simple/price endpoint). If a rate limit is ever hit, set an API key in
// .env.local and pass it via the x-cg-demo-api-key header below.

export type MarketCoin = {
  id: string;
  symbol: string;
  name: string;
};

// The coins surfaced on the market section, in display order.
export const marketCoins: MarketCoin[] = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "binancecoin", symbol: "BNB", name: "BNB" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
];

export type MarketQuote = {
  usd: number;
  usd_24h_change: number | null;
  usd_market_cap: number | null;
  usd_24h_vol: number | null;
};

export type MarketData = Record<string, MarketQuote>;

export const MARKET_API_BASE = "https://api.coingecko.com/api/v3";
export const MARKET_ENDPOINT = `${MARKET_API_BASE}/simple/price`;

export const MARKET_COIN_IDS = marketCoins.map((c) => c.id).join(",");
