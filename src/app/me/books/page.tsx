"use client";
import { useState } from "react";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import BookList from "@/modules/books/components/BookList";
import Container from "@/modules/common/Container";
import { useUserBooks } from "@/modules/books/hooks/useUserBooks";
import DeleteBook from "@/modules/books/components/DeleteBook";
import { useSearchStore } from "@/modules/auth/stores/useSearchStore";
import { applyFilters } from "@/modules/books/utils/searchFilters";
import AddBookForm from "@/modules/books/components/AddBookForm";

export default function Mybooks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const query = useSearchStore((s) => s.query);
  const filters = useSearchStore((s) => s.filters);

  const { books, loadMore, hasMore } = useUserBooks(user?.uid);
  const filteredBooksList = applyFilters(books, query, filters);
  console.log(books);

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">My Books</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-amber-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
        >
          + Додати книгу
        </button>
      </div>
      <BookList
        books={filteredBooksList}
        allBooks={books}
        loadMore={loadMore}
        hasMore={hasMore}
        renderActions={(book) => <DeleteBook id={book.id} />}
      />
      <AddBookForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
}
