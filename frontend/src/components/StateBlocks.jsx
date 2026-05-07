import { AlertTriangle, Loader2, Search } from "lucide-react";

export function LoadingState({ text = "Načítavam dáta..." }) {
  return (
    <div className="panel flex min-h-40 items-center justify-center gap-3 p-6 muted">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>{text}</span>
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="panel flex min-h-32 items-center gap-3 border-red-200 p-6 text-red-700 dark:border-red-900 dark:text-red-300">
      <AlertTriangle className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}

export function EmptyState({ text = "Žiadne dáta na zobrazenie." }) {
  return (
    <div className="panel flex min-h-32 items-center justify-center gap-3 p-6 muted">
      <Search className="h-5 w-5" />
      <span>{text}</span>
    </div>
  );
}
