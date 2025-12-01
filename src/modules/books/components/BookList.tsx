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
    <div className=" shadow-xl m-auto p-6  rounded-lg ">
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-wrap justify-center bg-gray-700 p-4">
        {books.map((book) => (
          <BookItem key={book.id} book={book} renderActions={renderActions} />
        ))}
      </ul>
      {loading && (
        <p className="text-white text-center mt-4">Завантаження...</p>
      )}
      {books.length === 0 && !loading && (
        <p className="text-white text-center mt-4">Книги не знайдено</p>
      )}
      {hasMore && loadMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            Показати більше
          </button>
        </div>
      )}
    </div>
  );
}
