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
    <div className="bg-gray-900 shadow-2xl m-auto p-8 rounded-2xl max-w-7xl">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
            <BookItem key={book.id} book={book}  renderActions={renderActions} />
        ))}
      </ul>
      {loading && (
        <p className="text-white text-center mt-6 text-lg">Завантаження...</p>
      )}
      {books.length === 0 && !loading && (
        <p className="text-white text-center mt-6 text-lg">Книги не знайдено</p>
      )}
      {hasMore && loadMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all"
            disabled={loading}
          >
            Показати більше
          </button>
        </div>
      )}
    </div>
  );
}
