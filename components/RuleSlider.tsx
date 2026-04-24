'use client';

type RuleSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

export function RuleSlider({ label, value, min, max, step = 1, onChange }: RuleSliderProps) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between text-sm font-medium text-slate-700">
        <span>{label}</span>
        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded bg-slate-200"
      />
    </label>
  );
}
