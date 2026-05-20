"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Enregistrement des modules Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

interface MarketChart {
  prices: [number, number][];
}

export default function MultiCryptoChart() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/multicrypto");
        const { btcData, ethData, solData } = await res.json();

        const btcPrices: [number, number][] = btcData.prices;
        const ethPrices: [number, number][] = ethData.prices;
        const solPrices: [number, number][] = solData.prices;

        setChartData({
          labels: btcPrices.map((p) =>
            new Date(p[0]).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
          ),
          datasets: [
            {
              label: "Bitcoin (USD)",
              data: btcPrices.map((p) => p[1]),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: true,
              tension: 0.3,
            },
            {
              label: "Ethereum (USD)",
              data: ethPrices.map((p) => p[1]),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
              tension: 0.3,
            },
            {
              label: "Solana (USD)",
              data: solPrices.map((p) => p[1]),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Erreur API interne:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Évolution BTC / ETH / SOL (7 jours)</h2>
      {chartData ? <Line data={chartData} /> : <p>Chargement du graphique...</p>}
    </div>
  );
}
