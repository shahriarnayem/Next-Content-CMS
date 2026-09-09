// components/CategoryPills.jsx
import Link from "next/link";

export default function CategoryPills({ activeCategory = "all" }) {
  const categories = [
    { label: "All Stories", slug: "all", href: "/" },
    { label: "Tech", slug: "tech", href: "/category/tech" },
    { label: "Sports", slug: "sports", href: "/category/sports" },
    { label: "AI", slug: "ai", href: "/category/ai" },
  ];

  return (
    <div className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-2">
      {categories.map((cat) => {
        const isActive = activeCategory.toLowerCase() === cat.slug;

        return (
          <Link
            key={cat.slug}
            href={cat.href}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              isActive
                ? "bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}