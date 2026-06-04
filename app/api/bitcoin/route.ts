import { NextResponse } from "next/server";

interface MarketChart {
  prices: [number, number][];
}

let cache: MarketChart | null = null;
let lastFetch = 0;

export async function GET() {
  const now = Date.now();

  if (cache && now - lastFetch < 120000) {
    return NextResponse.json(cache);
  }

  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
    );
    const data = await res.json();

    cache = data;
    lastFetch = now;

    return NextResponse.json(data);
  } catch (_error) {
    return NextResponse.json({ error: "Erreur API CoinGecko" }, { status: 500 });
  }
}
