import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
        />
      </head>
      <body
        className={`${ppNeueMontrealBook.variable} ${ppNeueMontrealMedium.variable} ${ppNeueMontrealMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
