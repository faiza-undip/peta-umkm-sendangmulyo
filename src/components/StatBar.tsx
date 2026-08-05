export default function StatBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.max(4, Math.round((value / max) * 100));
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="text-paper/80">{label}</span>
        <span className="font-avenir text-xs text-paper/50">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-plate">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
