// components/SubmitButton.jsx
"use client";

import { useFormStatus } from "react-dom";
import { Send, Loader2 } from "lucide-react";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Publishing...
        </>
      ) : (
        <>
          <Send className="h-3.5 w-3.5" />
          Publish Story
        </>
      )}
    </button>
  );
}