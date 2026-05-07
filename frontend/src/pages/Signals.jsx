import { AlertTriangle, Gauge } from "lucide-react";
import { Disclaimer } from "../components/Disclaimer";
import { ErrorState, LoadingState } from "../components/StateBlocks";
import { api } from "../services/api";
import { useApi } from "../hooks/useApi";
import { formatPercent, signalTone } from "../utils/format";

export function Signals() {
  const { data, loading, error } = useApi(api.assets, []);
  const assets = data?.assets || [];

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-accent">Technické signály</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Automatické pravidlá opatrnosti</h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {assets.map((asset) => (
          <article key={asset.ticker} className="panel p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold muted">{asset.ticker}</p>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">{asset.name}</h2>
              </div>
              <span className={`chip ${signalTone(asset.signal)}`}>{asset.signal}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <SignalMetric label="Cena vs SMA20" value={asset.price > asset.sma20 ? "nad" : "pod"} />
              <SignalMetric label="Cena vs SMA50" value={asset.price > asset.sma50 ? "nad" : "pod"} />
              <SignalMetric label="RSI" value={asset.rsi} />
            </div>
            <p className="mt-4 flex gap-2 text-sm leading-6 muted">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {buildSignalText(asset)}
            </p>
          </article>
        ))}
      </div>

      <Disclaimer />
    </div>
  );
}

function SignalMetric({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
      <p className="text-xs muted">{label}</p>
      <p className="mt-1 flex items-center gap-2 font-bold text-slate-950 dark:text-white">
        <Gauge className="h-4 w-4 text-accent" />
        {value}
      </p>
    </div>
  );
}

function buildSignalText(asset) {
  if (asset.rsi > 70) return "RSI je nad 70, technický obraz môže naznačovať prekúpenie a možnú korekciu.";
  if (asset.rsi < 30) return "RSI je pod 30, situácia môže naznačovať prepredanie, ale stále je vhodné sledovať potvrdenie trendu.";
  if (asset.volatility >= 8) return `Volatilita ${asset.volatility}/10 je zvýšená, preto je vhodná opatrnosť pri krátkodobých pohyboch. Denná zmena je ${formatPercent(asset.dailyChangePercent)}.`;
  if (asset.price > asset.sma20 && asset.price > asset.sma50) return "Cena je nad SMA 20 aj SMA 50, čo podporuje rastový technický obraz.";
  if (asset.price < asset.sma20 && asset.price < asset.sma50) return "Cena je pod SMA 20 aj SMA 50, technický obraz zatiaľ naznačuje slabší trend.";
  return "Obraz je zmiešaný, preto môže byť vhodné sledovať objem, RSI a reakciu ceny pri ďalšej sviečke.";
}
