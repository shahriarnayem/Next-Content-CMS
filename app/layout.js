// app/layout.jsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Rss } from "lucide-react";

export const metadata = {
  title: "FeedCMS - Modern News & Articles",
  description: "A fast, minimalist content publishing platform built with Next.js and React.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 antialiased transition-colors dark:bg-neutral-950 dark:text-neutral-100">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
        <footer className="border-t border-neutral-200 bg-white py-6 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-xs text-neutral-500 dark:text-neutral-400 sm:flex-row sm:px-6">
            <p>© {new Date().getFullYear()} FeedCMS. Published with Next.js Server Components.</p>
            <div className="flex items-center gap-4">
              <Link
                href="/feed.xml"
                target="_blank"
                className="inline-flex items-center gap-1.5 transition hover:text-neutral-900 dark:hover:text-white"
              >
                <Rss className="h-3.5 w-3.5 text-amber-500" />
                RSS Feed
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}