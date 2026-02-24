"use client";
import ProtectedRoute from "@/modules/auth/middleware/ProtectedRoute";
import BookList from "@/modules/books/components/BookList";
import { useBooks } from "@/modules/books/hooks/useBooks";
import { useSearchStore } from "@/modules/auth/stores/useSearchStore";
import { applyFilters } from "@/modules/books/utils/searchFilters";

export default function Books() {
  const { books, loading, hasMore, loadMore } = useBooks();
  const query = useSearchStore((s) => s.query);
  const filters = useSearchStore((s) => s.filters);
  const filteredBooksList = applyFilters(books, query, filters);

  return (
    <ProtectedRoute>
      <BookList
        books={filteredBooksList}
        allBooks={books}
        loading={loading}
        hasMore={hasMore}
        loadMore={loadMore}
      />
    </ProtectedRoute>
  );
}
