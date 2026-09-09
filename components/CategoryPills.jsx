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
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isActive = activeCategory.toLowerCase() === cat.slug;

        return (
          <Link
            key={cat.slug}
            href={cat.href}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              isActive
                ? "bg-neutral-900 text-white shadow-xs"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}