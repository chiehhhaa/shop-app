import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "mock.shop | Premium Collection",
  description:
    "Curated styles for the season. Shop the latest drops and exclusive collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-slate-900 text-slate-900 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
