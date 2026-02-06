"use client";
import ProtectedRoute from "@/modules/auth/middlware/ProtectedRoute";
import Container from "@/modules/common/Container";
import BookList from "@/modules/books/components/BookList";
import { useBooks } from "@/modules/books/hooks/useBooks";
import Details from "@/modules/books/components/Details";
import {
  useSearchStore,
  filteredBooks,
} from "@/modules/auth/stores/useSearchStore";

export default function Books() {
  const { Allbooks, loading, hasMore, loadMore } = useBooks();
  const query = useSearchStore((s) => s.query);

  return (
    <ProtectedRoute>
      <Container>
        <div className="flex flex-col gap-2 mb-6 ">
          <h1 className="text-3xl font-bold text-stone-900">Всі книги</h1>
          <h3 className="text-lg text-stone-400">
            Знайдено {filteredBooks(Allbooks, query).length} книг для обміну
          </h3>
        </div>

        <BookList
          books={filteredBooks(Allbooks, query)}
          loading={loading}
          hasMore={hasMore}
          loadMore={loadMore}
          renderActions={(book) => <Details id={book.id} />}
        />
      </Container>
    </ProtectedRoute>
  );
}
