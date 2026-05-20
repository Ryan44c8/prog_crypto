import { NextResponse } from "next/server";

let cache: any = null;
let lastFetch = 0;

export async function GET() {
  const now = Date.now();

  if (cache && now - lastFetch < 120000) {
    return NextResponse.json(cache);
  }

  try {
    const [btcRes, ethRes, solRes] = await Promise.all([
      fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"),
      fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7"),
      fetch("https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=7"),
    ]);

    const [btcData, ethData, solData] = await Promise.all([
      btcRes.json(),
      ethRes.json(),
      solRes.json(),
    ]);

    const data = { btcData, ethData, solData };

    cache = data;
    lastFetch = now;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erreur API CoinGecko" }, { status: 500 });
  }
}
