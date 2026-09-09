// app/layout.jsx
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "FeedCMS - Modern News & Articles",
  description: "A fast, minimalist content publishing platform built with Next.js and React.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
        <footer className="border-t border-neutral-200 bg-white py-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} FeedCMS. Published with Next.js Server Components.
        </footer>
      </body>
    </html>
  );
}