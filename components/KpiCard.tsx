type KpiCardProps = {
  title: string;
  value: string;
  description: string;
};

export function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <div className="card">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-navBlue">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}
