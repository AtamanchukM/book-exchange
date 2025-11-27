import type { BookData } from "@/types/book";
import React from "react";
import Image from "next/image";
import placeholder from "../../../public/placeholder.png";

type BookListProps = {
  books: BookData[];
  renderActions?: (book: BookData) => React.ReactNode;
};

export default function BookList({ books, renderActions }: BookListProps) {
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
    </div>
  );
}
