import { useState } from "react";
import { Header } from "./components/Header";
import { Dashboard } from "./pages/Dashboard";
import { Assets } from "./pages/Assets";
import { Compare } from "./pages/Compare";
import { Signals } from "./pages/Signals";
import { AIBroker } from "./pages/AIBroker";
import { Settings } from "./pages/Settings";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState("RDDT");
  const { theme, setTheme } = useTheme();

  function openAsset(ticker) {
    setSelectedTicker(ticker);
    setActivePage("assets");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-navy dark:text-slate-100">
      <Header activePage={activePage} setActivePage={setActivePage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} theme={theme} setTheme={setTheme} />
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
        {activePage === "dashboard" && <Dashboard openAsset={openAsset} />}
        {activePage === "assets" && <Assets selectedTicker={selectedTicker} setSelectedTicker={setSelectedTicker} />}
        {activePage === "compare" && <Compare />}
        {activePage === "signals" && <Signals />}
        {activePage === "broker" && <AIBroker />}
        {activePage === "settings" && <Settings theme={theme} setTheme={setTheme} />}
      </main>
    </div>
  );
}
