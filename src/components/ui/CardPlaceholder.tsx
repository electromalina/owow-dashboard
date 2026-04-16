// Simple placeholder card used while composing dashboard layouts.
type CardPlaceholderProps = {
  className?: string;
};

export function CardPlaceholder({ className }: CardPlaceholderProps) {
  return (
    <section
      className={`rounded-2xl border border-off-white/15 bg-off-black/90 p-5 ${className ?? ""}`}
    />
  );
}
