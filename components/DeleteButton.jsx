// components/DeleteButton.jsx
"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteExistingPost } from "@/app/editor/actions";

export default function DeleteButton({ id, title }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    startTransition(async () => {
      await deleteExistingPost(id);
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/40"
    >
      {isPending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="h-3.5 w-3.5" />
          Delete Story
        </>
      )}
    </button>
  );
}