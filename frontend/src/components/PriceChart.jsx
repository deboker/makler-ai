import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export function PriceChart({ data, lines }) {
  const lineConfig = lines || [{ key: "price", color: "#2F80ED", name: "Cena" }];

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94A3B8" />
          <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #CBD5E1",
              background: "rgba(15, 23, 42, 0.95)",
              color: "#fff"
            }}
          />
          {lineConfig.map((line) => (
            <Line key={line.key} type="monotone" dataKey={line.key} name={line.name} stroke={line.color} strokeWidth={2.5} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
