import type { BookData } from "@/types/book";
import React from "react";
import Link from "next/link";

type BookListProps = {
  books: BookData[];
  renderActions?: (book: BookData) => React.ReactNode;
};

export default function BookList({ books, renderActions }: BookListProps) {
  return (
   <div className="border p-6 rounded-lg ">
     <ul className="flex gap-4 flex-wrap">
      {books.map((book) => (
        <li key={book.id} className="text-white mb-2 border p-4 rounded">
          <h2 className="text-xl font-semibold"> Ім'я книги {book.name}</h2>
          <p className="text-gray-300">Автор: {book.author}</p>
          <p>Власник: {book.ownerName}</p>
          {renderActions && renderActions(book)}
          <Link href={`/books/${book.id}`} className="border py-2 px-4 bg-green-400 flex w-fit ">Detail</Link>
        </li>
      ))}

    </ul>
    
   </div>
  );
}