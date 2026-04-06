import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-dvh flex-col bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1520px] flex-col px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4 lg:px-8">
        <header className="shrink-0">
          <Header />
        </header>

        <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center px-4 py-3 sm:px-6 sm:py-4">
          {children}
        </div>

        <footer className="shrink-0 pt-2 sm:pt-4">
          <Footer />
        </footer>
      </div>
    </main>
  );
}
