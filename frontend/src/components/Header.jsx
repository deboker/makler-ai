import { BarChart3, Bot, Menu, Moon, Sun, X } from "lucide-react";

const navItems = [
  ["dashboard", "Dashboard"],
  ["assets", "Aktíva"],
  ["compare", "Porovnanie"],
  ["signals", "Signály"],
  ["broker", "AI Maklér"],
  ["settings", "Nastavenia"]
];

export function Header({ activePage, setActivePage, mobileOpen, setMobileOpen, theme, setTheme }) {
  const nav = (
    <>
      {navItems.map(([key, label]) => (
        <button
          key={key}
          onClick={() => {
            setActivePage(key);
            setMobileOpen(false);
          }}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
            activePage === key
              ? "bg-accent text-white"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          {label}
        </button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-navy/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <button onClick={() => setActivePage("dashboard")} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
            <BarChart3 className="h-5 w-5" />
          </span>
          <span className="text-left">
            <span className="block text-lg font-bold text-slate-950 dark:text-white">Maklér AI</span>
            <span className="block text-xs muted">analytický fintech asistent</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">{nav}</nav>

        <div className="flex items-center gap-2">
          <button
            className="rounded-md border border-slate-200 p-2 text-slate-600 dark:border-slate-800 dark:text-slate-300"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Prepnúť tému"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            className="rounded-md border border-slate-200 p-2 text-slate-600 dark:border-slate-800 dark:text-slate-300 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && <nav className="grid gap-1 border-t border-slate-200 p-3 dark:border-slate-800 lg:hidden">{nav}</nav>}
    </header>
  );
}
