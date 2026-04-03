export default function AdminPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="min-h-40 rounded-2xl border border-off-white/15 bg-black/40 p-6 backdrop-blur-sm">
        <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-off-white/80">
          Content
        </h2>
        <p className="mt-3 text-sm text-off-white/60">
          Add admin-only widgets here. Client-facing routes stay under the main
          dashboard.
        </p>
      </section>
      <section className="min-h-40 rounded-2xl border border-off-white/15 bg-black/40 p-6 backdrop-blur-sm">
        <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-off-white/80">
          Quick actions
        </h2>
        <p className="mt-3 text-sm text-off-white/60">
          Placeholder for future actions (invite users, publish updates, etc.).
        </p>
      </section>
    </div>
  );
}
