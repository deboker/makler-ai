import { useState } from "react";
import { CheckCircle2, Server, SlidersHorizontal } from "lucide-react";
import { Disclaimer } from "../components/Disclaimer";
import { api } from "../services/api";
import { useApi } from "../hooks/useApi";

export function Settings({ theme, setTheme }) {
  const { data, loading, error } = useApi(api.health, []);
  const [interval, setIntervalValue] = useState("60");

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-accent">Nastavenia</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Prevádzka aplikácie</h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-accent" />
            <h2 className="font-bold text-slate-950 dark:text-white">Netlify Functions API</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <Row label="Stav" value={loading ? "Overujem..." : error ? "Nedostupné" : data?.status || "ok"} />
            <Row label="API URL" value={api.baseUrl} />
            <Row label="Dátový režim" value="Demo dáta pripravené na market data API v Netlify Environment Variables" />
          </div>
        </section>

        <section className="panel p-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-accent" />
            <h2 className="font-bold text-slate-950 dark:text-white">Používateľské voľby</h2>
          </div>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-semibold">
              Téma
              <select value={theme} onChange={(event) => setTheme(event.target.value)} className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
                <option value="dark">Dark mode</option>
                <option value="light">Light mode</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">
              Refresh interval dát
              <select value={interval} onChange={(event) => setIntervalValue(event.target.value)} className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
                <option value="30">30 sekúnd</option>
                <option value="60">60 sekúnd</option>
                <option value="300">5 minút</option>
              </select>
            </label>
            <div className="rounded-lg bg-slate-50 p-4 text-sm dark:bg-slate-800">
              <p className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                AI model
              </p>
              <p className="mt-1 muted">Groq model cez premennú GROQ_MODEL, predvolene llama-3.1-8b-instant.</p>
            </div>
          </div>
        </section>
      </div>

      <Disclaimer />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-0 dark:border-slate-800">
      <span className="text-xs muted">{label}</span>
      <span className="break-words font-semibold text-slate-950 dark:text-white">{value}</span>
    </div>
  );
}
