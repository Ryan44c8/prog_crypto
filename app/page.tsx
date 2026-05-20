import CryptoPrices from "../components/CryptoPrices";
import BitcoinChart from "../components/BitcoinChart";
import MultiCryptoChart from "../components/MultiCryptoChart";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <h1>Mon Dashboard Crypto</h1>
      <div className="dashboard-grid">
        <div className="card">
          <CryptoPrices />
        </div>
        <div className="card">
          <BitcoinChart />
        </div>
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <MultiCryptoChart />
        </div>
      </div>
      <Footer />
    </main>
  );
}
