export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-6">
      <header className="border-b border-off-white/15 pb-4">
        <h1 className="font-mono text-sm uppercase tracking-[0.12em] text-off-white">
          Admin panel
        </h1>
        <p className="mt-1 text-sm text-off-white/70">
          Placeholder area for dashboard widgets (merge from feature branches).
        </p>
      </header>
      {children}
    </div>
  );
}
