"use client";

import { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  current_price: number;
}

export default function CryptoPrices() {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/crypto"); // appel vers ton API interne
        const json = await res.json();

        if (Array.isArray(json)) {
          setData(json);
          setError(null);
        } else {
          setError("Réponse inattendue de l'API");
          setData([]);
        }
      } catch (err) {
        console.error("Erreur API interne:", err);
        setError("Impossible de récupérer les données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Crypto Dashboard</h2>

      {loading && <p>Chargement des données...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {data.map((coin) => (
            <li key={coin.id}>
              <span>{coin.name}</span>
              <span className="crypto-value">: ${coin.current_price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
