import { useEffect, useState } from "react";
import { Timer, RotateCw } from "lucide-react";
import { AssetCard } from "../components/AssetCard";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState, ErrorState, LoadingState } from "../components/StateBlocks";
import { api } from "../services/api";
import { useApi } from "../hooks/useApi";

export function Dashboard({ openAsset }) {
  const refreshInterval = 60;
  const [refreshTick, setRefreshTick] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(refreshInterval);
  const { data, loading, error } = useApi(api.assets, [refreshTick]);
  const assets = data?.assets || [];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setRefreshTick((tick) => tick + 1);
          return refreshInterval;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!assets.length) return <EmptyState />;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-accent">Demo market dáta</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Prehľad sledovaných aktív</h1>
          <p className="mt-2 max-w-3xl muted">Profesionálny dashboard sleduje cenu, trend, riziko a opatrne formulované analytické signály pre šesť vybraných aktív.</p>
        </div>

        <div className="w-full rounded-lg border border-slate-200 bg-white p-4 shadow-panel dark:border-slate-800 dark:bg-slate-900 sm:w-auto sm:min-w-64">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-accent dark:bg-blue-950">
              <Timer className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Refresh interval</p>
              <p className="mt-1 text-lg font-bold text-slate-950 dark:text-white">{refreshInterval} sekúnd</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">
            <span className="flex items-center gap-2 muted">
              <RotateCw className="h-4 w-4" />
              Ďalšie obnovenie
            </span>
            <span className="font-bold text-slate-950 dark:text-white">{secondsLeft}s</span>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {assets.map((asset) => (
          <AssetCard key={asset.ticker} asset={asset} onDetail={openAsset} />
        ))}
      </div>

      <Disclaimer />
    </div>
  );
}
