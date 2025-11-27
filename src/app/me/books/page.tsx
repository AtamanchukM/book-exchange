"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import BookList from "@/components/books/BookList";
import Container from "@/components/common/Container";
import { useBooks } from "@/hooks/useBooks";
import Details from "@/components/common/Details";
import DeleteBook from "@/components/common/DeleteBook";
import { useSearchStore } from "@/stores/useSearchStore";
import AddBookForm from "@/components/forms/AddBookForm";

export default function Mybooks() {
  const user = useAuthStore((state) => state.user);
  const query = useSearchStore((s) => s.query);

  const { books } = useBooks();
  const userBooks = user
    ? books
        .filter((book) => book.ownerId === user.uid)
        .filter(
          (book) =>
            book.name.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        )
    : [];

  return (
    <Container>
      <h1 className="text-white text-3xl mb-4">My Books</h1>
      <BookList
        books={userBooks}
        renderActions={(book) => (
          <div className="flex flex-col justify-center gap-2">
            <DeleteBook id={book.id} />
            <Details id={book.id} />
          </div>
        )}
      />
      <AddBookForm />
    </Container>
  );
}
