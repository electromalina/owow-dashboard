import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/src/components/Footer";
import { Sidebar } from "@/src/components/Sidebar";
import { Header } from "@/src/components/Header";
import "./globals.css";
// Root app shell: fonts, header/sidebar frame, page content, and footer.

const ppNeueMontrealBook = localFont({
  variable: "--font-body",
  src: [
    { path: "../public/fonts/ppneuemontreal-book.woff2", weight: "400" },
    { path: "../public/fonts/ppneuemontreal-book.woff", weight: "400" },
  ],
  display: "swap",
});

const ppNeueMontrealMedium = localFont({
  variable: "--font-heading",
  src: [
    { path: "../public/fonts/ppneuemontreal-medium.woff2", weight: "500" },
    { path: "../public/fonts/ppneuemontreal-medium.woff", weight: "500" },
  ],
  display: "swap",
});

const ppNeueMontrealMono = localFont({
  variable: "--font-mono",
  src: [
    { path: "../public/fonts/pp-neue-montreal-mono.woff2", weight: "400" },
    { path: "../public/fonts/pp-neue-montreal-mono.woff", weight: "400" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OWOW Dashboard",
  description: "OWOW agency dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ppNeueMontrealBook.variable} ${ppNeueMontrealMedium.variable} ${ppNeueMontrealMono.variable} antialiased`}
      >
        <main className="min-h-screen bg-background text-foreground">
          <div className="mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-4 py-5 lg:px-8">
            <Header />

            <div className="flex flex-1 flex-col gap-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
              <section className="hidden lg:block">
                <Sidebar />
              </section>
              <section className="space-y-4 lg:pr-6">{children}</section>
            </div>

            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
