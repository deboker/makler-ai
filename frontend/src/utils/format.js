export function formatPrice(value) {
  return new Intl.NumberFormat("sk-SK", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value > 1000 ? 0 : 2
  }).format(value);
}

export function formatPercent(value) {
  return `${value > 0 ? "+" : ""}${Number(value).toFixed(2)} %`;
}

export function trendLabel(value) {
  const map = {
    rastuci: "rastúci",
    klesajuci: "klesajúci",
    neutralny: "neutrálny"
  };
  return map[value] || value;
}

export function signalTone(signal = "") {
  if (signal.includes("Siln")) return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300";
  if (signal.includes("volatil") || signal.includes("opatr")) return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300";
  if (signal.includes("prílež") || signal.includes("prilez")) return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300";
  return "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200";
}
