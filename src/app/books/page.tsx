"use client";
import ProtectedRoute from "@/route/ProtectedRoute";
import Container from "@/components/common/Container";
import BookList from "@/components/books/BookList";
import { useBooks } from "@/hooks/useBooks";
import Details from "@/components/books/Details";
import { useSearchStore, filteredBooks } from "@/stores/useSearchStore";

export default function Books() {
  const { Allbooks, loading, hasMore, loadMore } = useBooks();
  const query = useSearchStore((s) => s.query);


  return (
    <ProtectedRoute>
      <Container>
        <h1 className="text-white text-3xl font-bold mb-4">Book List</h1>

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
