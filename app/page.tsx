import { BudgetSnapshotWidget } from "@/src/components/budget-snapshot/BudgetSnapshotWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-semibold">OWOW Dashboard</h1>
        <p className="mt-2 text-sm text-off-white">
          Main page placeholder. Use `/auth` and `/admin` for separated areas.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a
            className="rounded-xl border border-off-white bg-off-black p-4 hover:bg-off-black/80"
            href="/auth"
          >
            <div className="font-medium">Auth area</div>
            <div className="mt-1 text-sm text-off-white">
              Authentication-related pages live here.
            </div>
          </a>
          <a
            className="rounded-xl border border-off-white bg-off-black p-4 hover:bg-off-black/80"
            href="/admin"
          >
            <div className="font-medium">Admin area</div>
            <div className="mt-1 text-sm text-off-white">
              Admin-only pages live here.
            </div>
          </a>
        </div>

        <div className="mt-10 flex justify-center">
          <BudgetSnapshotWidget />
        </div>

        <div className="mt-10">
          <div className="text-sm font-medium">Project colors</div>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-9">
            <div className="h-10 rounded border border-off-white bg-black" title="black" />
            <div className="h-10 rounded border border-off-white bg-off-black" title="off-black" />
            <div className="h-10 rounded border border-off-white bg-white" title="white" />
            <div className="h-10 rounded border border-off-white bg-off-white" title="off-white" />
            <div className="h-10 rounded border border-off-white bg-beige" title="beige" />
            <div className="h-10 rounded border border-off-white bg-yellow" title="yellow" />
            <div className="h-10 rounded border border-off-white bg-blue" title="blue" />
            <div className="h-10 rounded border border-off-white bg-pink" title="pink" />
            <div className="h-10 rounded border border-off-white bg-green" title="green" />
          </div>
        </div>
      </div>
    </main>
  );
}
