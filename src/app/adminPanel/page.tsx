"use client";
import ProtectedAdmin from "@/route/ProtectedAdmin";
import BookList from "@/components/books/BookList";
import Container from "@/components/common/Container";
import { useBooks } from "@/hooks/useBooks";
import Details from "@/components/common/Details";
import DeleteBook from "@/components/common/DeleteBook";
import { useSearchStore } from "@/stores/useSearchStore";

export default function AdminPanel() {
  const { books } = useBooks();
  const query = useSearchStore((s) => s.query);
  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ProtectedAdmin>
      <Container>
        <h1>Admin Panel</h1>
        <BookList
          books={filteredBooks}
          renderActions={(book) => (
            <div className="flex flex-col justify-center gap-2">
              <DeleteBook id={book.id} />
              <Details id={book.id} />
            </div>
          )}
        />
      </Container>
    </ProtectedAdmin>
  );
}
