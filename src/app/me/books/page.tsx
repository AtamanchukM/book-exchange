"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import BookList from "@/components/books/BookList";
import Container from "@/components/common/Container";
import { useUserBooks } from "@/hooks/useUserBooks";
import Details from "@/components/books/Details";
import DeleteBook from "@/components/books/DeleteBook";
import { useSearchStore, filteredBooks } from "@/stores/useSearchStore";
import AddBookForm from "@/components/forms/AddBookForm";

export default function Mybooks() {
  const user = useAuthStore((state) => state.user);
  const query = useSearchStore((s) => s.query);

  const { books, loadMore, hasMore } = useUserBooks(user?.uid);


  return (
    <Container>
      <h1 className="text-white text-3xl mb-4">My Books</h1>
      <BookList
        books={filteredBooks(books, query)}
        loadMore={loadMore}
        hasMore={hasMore}
        renderActions={(book) => (
          <div className="flex flex-col justify-center gap-2">
            <DeleteBook id={book.id}  />
            <Details id={book.id} />
          </div>
        )}
      />
      <AddBookForm />
    </Container>
  );
}
