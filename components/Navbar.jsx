// components/Navbar.jsx
import Link from "next/link";
import { Newspaper, PenSquare } from "lucide-react";

export default function Navbar() {
  const categories = [
    { label: "Tech", href: "/category/tech" },
    { label: "Sports", href: "/category/sports" },
    { label: "AI", href: "/category/ai" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-neutral-900 transition hover:opacity-80"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
              <Newspaper className="h-4 w-4" />
            </span>
            <span>FeedCMS</span>
          </Link>

          {/* Navigation Category Links */}
          <nav className="hidden items-center gap-6 sm:flex">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-neutral-800 sm:text-sm"
          >
            <PenSquare className="h-4 w-4" />
            <span>Write Story</span>
          </Link>
        </div>

      </div>
    </header>
  );
}