"use client";
import { useState } from "react";
import { deleteBook } from "@/modules/books/services/deleteBook";

export default function DeleteBook({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm("Ви впевнені, що хочете видалити цю книгу?")) return;

    setLoading(true);
    setError(null);
    try {
      await deleteBook(id);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Помилка при видаленні";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        disabled={loading}
        className="w-full px-4 py-2 text-white transition-colors duration-300 rounded bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleDelete}
      >
        {loading ? "Видалення..." : "Видалити"}
      </button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
