"use client";
import ProtectedRoute from "@/route/ProtectedRoute";
import Container from "@/components/common/Container";
import BookList from "@/components/books/BookList";
import { useBooks } from "@/hooks/useBooks";
import Details from "@/components/common/Details";
import { useSearchStore } from "@/stores/useSearchStore";


export default function Books() {
  const { books } = useBooks();
  const query = useSearchStore((s) => s.query);

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <ProtectedRoute>
      <Container>
        <h1 className="text-white text-3xl font-bold mb-4">Book List</h1>

        <BookList
          books={filteredBooks}
          renderActions={(book) => <Details id={book.id} />}
        />
      </Container>
    </ProtectedRoute>
  );
}
