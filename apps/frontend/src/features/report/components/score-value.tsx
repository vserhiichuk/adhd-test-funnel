type ScoreValueProps = {
  value: number;
  caption: string;
  className?: string;
};

export function ScoreValue({ value, caption, className }: ScoreValueProps) {
  return (
    <div className={className}>
      <p className="font-display text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted">{caption}</p>
    </div>
  );
}
