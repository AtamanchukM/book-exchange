"use client";
import { useState } from "react";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import BookList from "@/modules/books/components/BookList";
import Container from "@/modules/common/Container";
import { useUserBooks } from "@/modules/books/hooks/useUserBooks";
import DeleteBook from "@/modules/books/components/DeleteBook";
import {
  useSearchStore,
  filteredBooks,
} from "@/modules/auth/stores/useSearchStore";
import AddBookForm from "@/modules/books/components/AddBookForm";

export default function Mybooks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const query = useSearchStore((s) => s.query);

  const { books, loadMore, hasMore } = useUserBooks(user?.uid);

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
        books={filteredBooks(books, query)}
        loadMore={loadMore}
        hasMore={hasMore}
        renderActions={(book) => <DeleteBook id={book.id} />}
      />
      <AddBookForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
}
