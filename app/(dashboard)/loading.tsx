// Shown while dashboard route segments load (layout shell + sidebar stay mounted).
export default function DashboardLoading() {
  return (
    <div className="min-w-0 space-y-4">
      <div className="h-40 animate-pulse rounded-2xl bg-off-white/10 lg:h-44" />
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <div className="min-h-72 min-w-0 animate-pulse rounded-2xl bg-off-white/5" />
        <div className="min-h-56 min-w-0 animate-pulse rounded-2xl bg-off-white/5" />
      </div>
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(280px,1fr)]">
        <div className="min-h-80 min-w-0 animate-pulse rounded-2xl bg-off-white/5" />
        <div className="min-h-80 min-w-0 animate-pulse rounded-2xl bg-off-white/5" />
        <div className="min-h-80 min-w-0 animate-pulse rounded-2xl bg-off-white/5" />
      </div>
    </div>
  );
}
