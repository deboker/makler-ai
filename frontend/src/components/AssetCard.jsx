import { Activity, ArrowDownRight, ArrowUpRight, ShieldAlert } from "lucide-react";
import { formatPercent, formatPrice, trendLabel } from "../utils/format";

export function AssetCard({ asset, onDetail }) {
  const positive = asset.dailyChangePercent >= 0;

  return (
    <article className="panel flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold muted">{asset.ticker}</p>
          <h3 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">{asset.name}</h3>
        </div>
        <span className={`chip ${positive ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300" : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"}`}>
          {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          {formatPercent(asset.dailyChangePercent)}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="Cena" value={formatPrice(asset.price)} />
        <Metric label="Trend" value={trendLabel(asset.trend)} icon={<Activity className="h-4 w-4" />} />
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 muted">{asset.aiComment}</p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="flex items-center gap-2 text-sm muted">
          <ShieldAlert className="h-4 w-4" />
          Riziko {asset.riskScore}/10
        </span>
        <button onClick={() => onDetail(asset.ticker)} className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600">
          Detail analýzy
        </button>
      </div>
    </article>
  );
}

function Metric({ label, value, icon }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
      <p className="text-xs muted">{label}</p>
      <p className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
        {icon}
        {value}
      </p>
    </div>
  );
}
