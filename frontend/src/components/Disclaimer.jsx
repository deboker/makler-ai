import { ShieldAlert } from "lucide-react";
import { disclaimer } from "../data/assets";

export function Disclaimer() {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
      <div className="flex gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
        <p>{disclaimer}</p>
      </div>
    </div>
  );
}
