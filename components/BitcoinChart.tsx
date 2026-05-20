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

export default function BitcoinChart() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/bitcoin"); // appel vers ton API interne
        const data: MarketChart = await res.json();

        const prices: [number, number][] = data.prices;

        setChartData({
          labels: prices.map((p) =>
            new Date(p[0]).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
          ),
          datasets: [
            {
              label: "Prix BTC (USD)",
              data: prices.map((p) => p[1]),
              borderColor: "#38bdf8",
              backgroundColor: "rgba(56, 189, 248, 0.2)",
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
      <h2>Évolution du Bitcoin (7 jours)</h2>
      {chartData ? <Line data={chartData} /> : <p>Chargement du graphique...</p>}
    </div>
  );
}
