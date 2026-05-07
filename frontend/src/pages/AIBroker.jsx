import { useState } from "react";
import { Bot, Send, UserRound } from "lucide-react";
import { Disclaimer } from "../components/Disclaimer";
import { api } from "../services/api";

const suggestions = [
  "Ktoré aktívum dnes vyzerá najsilnejšie?",
  "Ktoré aktívum má najväčšie riziko?",
  "Porovnaj Reddit a Duolingo.",
  "Čo by som mal dnes sledovať?",
  "Ktoré aktívum má najlepší trend?"
];

export function AIBroker() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Som AI maklér pre analytické a vzdelávacie účely. Pýtajte sa na trendy, riziká a porovnanie sledovaných aktív."
    }
  ]);
  const [loading, setLoading] = useState(false);

  async function submit(value = question) {
    const clean = value.trim();
    if (!clean || loading) return;
    setQuestion("");
    setMessages((current) => [...current, { role: "user", text: clean }]);
    setLoading(true);
    try {
      const response = await api.chat(clean);
      setMessages((current) => [...current, { role: "assistant", text: response.answer }]);
    } catch (error) {
      setMessages((current) => [...current, { role: "assistant", text: error.message }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-accent">AI Maklér</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Krátke analytické odpovede</h1>
      </div>

      <section className="panel overflow-hidden">
        <div className="h-[520px] overflow-y-auto p-5">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && <Avatar icon={<Bot className="h-5 w-5" />} />}
                <div className={`max-w-2xl rounded-lg px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-accent text-white" : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"}`}>
                  {message.text}
                </div>
                {message.role === "user" && <Avatar icon={<UserRound className="h-5 w-5" />} />}
              </div>
            ))}
            {loading && <div className="text-sm muted">AI pripravuje opatrnú analytickú odpoveď...</div>}
          </div>
        </div>
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button key={item} onClick={() => submit(item)} className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold muted hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
                {item}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
            className="flex gap-2"
          >
            <input value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={700} placeholder="Napíšte otázku o sledovaných aktívach..." className="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950" />
            <button className="rounded-md bg-accent px-4 py-3 font-semibold text-white" aria-label="Odoslať">
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}

function Avatar({ icon }) {
  return <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{icon}</span>;
}
