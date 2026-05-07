import { AssetCard } from "../components/AssetCard";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState, ErrorState, LoadingState } from "../components/StateBlocks";
import { api } from "../services/api";
import { useApi } from "../hooks/useApi";

export function Dashboard({ openAsset }) {
  const { data, loading, error } = useApi(api.assets, []);
  const assets = data?.assets || [];

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!assets.length) return <EmptyState />;

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-semibold text-accent">Demo market dáta</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Prehľad sledovaných aktív</h1>
        <p className="mt-2 max-w-3xl muted">Profesionálny dashboard sleduje cenu, trend, riziko a opatrne formulované analytické signály pre šesť vybraných aktív.</p>
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
