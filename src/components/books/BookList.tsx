import type { BookData } from "@/types/book";
import React from "react";
import Image from "next/image";
import placeholder from "../../../public/placeholder.png";

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
          <li
            key={book.id}
            className="text-white border  border-gray-600 flex  gap-4 p-4 rounded  text-left"
          >
            <Image
              src={book.photoUrl || placeholder}
              alt={book.name}
              width={200}
              height={300}
              className="object-cover"
            />
            <div className="flex flex-col justify-between ">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{book.name}</h2>
                <p className="text-gray-300">Автор: {book.author}</p>
                <p>Власник: {book.ownerName}</p>
              </div>
              {renderActions && renderActions(book)}{" "}
            </div>
          </li>
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
