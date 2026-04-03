import { createClient } from "@/lib/supabase/server";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { buildDashboardNavLinks } from "@/src/components/sidebar-links";
import { Sidebar } from "@/src/components/Sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    isAdmin = profile?.role === "admin";
  }

  const navLinks = buildDashboardNavLinks(isAdmin);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-4 py-5 lg:px-8">
        <Header navLinks={navLinks} />

        <div className="flex flex-1 flex-col gap-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
          <section className="hidden lg:block">
            <Sidebar links={navLinks} />
          </section>
          <section className="space-y-4 lg:pr-6">{children}</section>
        </div>

        <Footer />
      </div>
    </main>
  );
}
