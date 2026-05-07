import { useMemo, useState } from "react";
import { Activity, BarChart3 } from "lucide-react";
import { PriceChart } from "../components/PriceChart";
import { Disclaimer } from "../components/Disclaimer";
import { ErrorState, LoadingState } from "../components/StateBlocks";
import { ranges } from "../data/assets";
import { api } from "../services/api";
import { useApi } from "../hooks/useApi";
import { formatPercent, formatPrice, signalTone } from "../utils/format";

export function Assets({ selectedTicker, setSelectedTicker }) {
  const [range, setRange] = useState("1m");
  const { data, loading, error } = useApi(api.assets, []);
  const assets = data?.assets || [];
  const ticker = selectedTicker || assets[0]?.ticker || "RDDT";
  const asset = useMemo(() => assets.find((item) => item.ticker === ticker) || assets[0], [assets, ticker]);
  const historyState = useApi(() => api.history(ticker, range), [ticker, range]);
  const aiState = useApi(() => api.analyze(ticker), [ticker]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-accent">Detail aktíva</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{asset?.name}</h1>
        </div>
        <select value={ticker} onChange={(event) => setSelectedTicker(event.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
          {assets.map((item) => (
            <option key={item.ticker} value={item.ticker}>{item.name} · {item.ticker}</option>
          ))}
        </select>
      </div>

      <section className="panel p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold muted">{asset?.ticker}</p>
            <p className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">{formatPrice(asset?.price || 0)}</p>
            <p className={`mt-1 text-sm font-semibold ${asset?.dailyChangePercent >= 0 ? "text-emerald-600" : "text-red-600"}`}>{formatPercent(asset?.dailyChangePercent || 0)} dnes</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ranges.map((item) => (
              <button key={item} onClick={() => setRange(item)} className={`rounded-md px-3 py-2 text-sm font-semibold ${range === item ? "bg-accent text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5">
          {historyState.loading ? <LoadingState text="Načítavam graf..." /> : <PriceChart data={historyState.data?.history || []} />}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="panel grid gap-3 p-5 sm:grid-cols-2 lg:col-span-2">
          <Stat label="52-week high" value={formatPrice(asset.week52High)} />
          <Stat label="52-week low" value={formatPrice(asset.week52Low)} />
          <Stat label="Market cap" value={asset.marketCap} />
          <Stat label="Volume" value={asset.volume} />
          <Stat label="Priemerný objem" value={asset.averageVolume} />
          <Stat label="SMA 20" value={formatPrice(asset.sma20)} />
          <Stat label="SMA 50" value={formatPrice(asset.sma50)} />
          <Stat label="RSI" value={asset.rsi} />
          <Stat label="Volatilita" value={`${asset.volatility}/10`} />
        </section>
        <section className="panel p-5">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent" />
            <h2 className="font-bold text-slate-950 dark:text-white">AI zhrnutie</h2>
          </div>
          <span className={`chip mt-4 ${signalTone(asset.signal)}`}>{asset.signal}</span>
          <p className="mt-4 text-sm leading-6 muted">{aiState.data?.answer || asset.aiComment}</p>
        </section>
      </div>

      <Disclaimer />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
      <p className="text-xs muted">{label}</p>
      <p className="mt-1 flex items-center gap-2 font-bold text-slate-950 dark:text-white">
        <BarChart3 className="h-4 w-4 text-accent" />
        {value}
      </p>
    </div>
  );
}
