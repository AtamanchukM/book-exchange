import type { BookData } from "@/modules/books/types/book.types";
import React from "react";
import BookItem from "./BookItem";

type BookListProps = {
  books: BookData[];
  renderActions?: (book: BookData) => React.ReactNode;
  loading?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
};

export default function BookList({
  books,
  renderActions,
  loading,
  hasMore,
  loadMore,
}: BookListProps) {
  return (
    <div className="">
      <ul className="flex flex-wrap gap-6">
        {books.map((book) => (
          <BookItem key={book.id} book={book} renderActions={renderActions} />
        ))}
      </ul>
      {loading && (
        <p className="mt-6 text-lg text-center text-white">Завантаження...</p>
      )}
      {books.length === 0 && !loading && (
        <p className="mt-6 text-lg text-center text-white">Книги не знайдено</p>
      )}
      {hasMore && loadMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-8 py-3 font-bold text-white transition-all "
            disabled={loading}
          >
            Показати більше
          </button>
        </div>
      )}
    </div>
  );
}
