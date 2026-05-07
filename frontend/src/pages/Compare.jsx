import { useMemo, useState } from "react";
import { PriceChart } from "../components/PriceChart";
import { Disclaimer } from "../components/Disclaimer";
import { ErrorState, LoadingState } from "../components/StateBlocks";
import { api } from "../services/api";
import { useApi } from "../hooks/useApi";
import { formatPercent } from "../utils/format";

const colors = ["#2F80ED", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6"];

export function Compare() {
  const { data, loading, error } = useApi(api.assets, []);
  const assets = data?.assets || [];
  const [selected, setSelected] = useState(["RDDT", "BKNG", "DUOL"]);
  const histories = useApi(async () => {
    const rows = await Promise.all(selected.map((ticker) => api.history(ticker, "1y")));
    return rows;
  }, [selected.join(",")]);

  const chartData = useMemo(() => {
    const rows = histories.data || [];
    if (!rows.length) return [];
    return rows[0].history.map((point, index) => {
      const row = { date: point.date };
      rows.forEach((series) => {
        const first = series.history[0]?.price || 1;
        row[series.ticker] = Number(((series.history[index]?.price / first - 1) * 100).toFixed(2));
      });
      return row;
    });
  }, [histories.data]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  function toggle(ticker) {
    setSelected((current) => {
      if (current.includes(ticker)) return current.length > 2 ? current.filter((item) => item !== ticker) : current;
      return current.length < 6 ? [...current, ticker] : current;
    });
  }

  const selectedAssets = assets.filter((asset) => selected.includes(asset.ticker));

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-accent">Porovnanie</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Relatívny výkon a riziko</h1>
      </div>

      <section className="panel p-5">
        <div className="flex flex-wrap gap-2">
          {assets.map((asset) => (
            <button key={asset.ticker} onClick={() => toggle(asset.ticker)} className={`rounded-md border px-3 py-2 text-sm font-semibold ${selected.includes(asset.ticker) ? "border-accent bg-blue-50 text-accent dark:bg-blue-950" : "border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300"}`}>
              {asset.ticker}
            </button>
          ))}
        </div>
        <div className="mt-5">
          {histories.loading ? <LoadingState text="Pripravujem porovnávací graf..." /> : <PriceChart data={chartData} lines={selected.map((ticker, index) => ({ key: ticker, name: ticker, color: colors[index] }))} />}
        </div>
      </section>

      <section className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Aktívum</th>
                <th className="px-4 py-3">Denná zmena</th>
                <th className="px-4 py-3">Mesačná zmena</th>
                <th className="px-4 py-3">Ročná zmena</th>
                <th className="px-4 py-3">Volatilita</th>
                <th className="px-4 py-3">Riziko</th>
                <th className="px-4 py-3">AI hodnotenie</th>
              </tr>
            </thead>
            <tbody>
              {selectedAssets.map((asset) => (
                <tr key={asset.ticker} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-4 font-bold text-slate-950 dark:text-white">{asset.name} <span className="muted">({asset.ticker})</span></td>
                  <td className="px-4 py-4">{formatPercent(asset.dailyChangePercent)}</td>
                  <td className="px-4 py-4">{formatPercent(asset.monthChangePercent)}</td>
                  <td className="px-4 py-4">{formatPercent(asset.yearChangePercent)}</td>
                  <td className="px-4 py-4">{asset.volatility}/10</td>
                  <td className="px-4 py-4">{asset.riskScore}/10</td>
                  <td className="px-4 py-4 muted">{asset.signal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
