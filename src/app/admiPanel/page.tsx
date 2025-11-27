"use client";
import { fetchBooks } from "@/services/fetchBooks";
import type { BookData } from "@/types/book";
import { useState, useEffect } from "react";
import { deleteBook } from "@/services/deleteBook";

export default function AdminPanel() {
  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const allBooks = await fetchBooks();
      setBooks(allBooks);
    };
    loadBooks();
  }, []);
  return (
    <div>
      Admin Panel Page
      <ul className="flex gap-4 flex-wrap">
        {books.map((book: BookData) => (
          <li key={book.id} className="text-white mb-2 border p-4 rounded">
            <h2 className="text-xl font-semibold">{book.name}</h2>
            <p className="text-gray-300">Автор: {book.author}</p>
            <p>Власник: {book.ownerName}</p>
            <button
              onClick={async () => {
                await deleteBook(book.id);
                const allBooks = await fetchBooks();
                setBooks(allBooks);
              }}
              className="border border-red-600 px-2 py-1 rounded bg-red-400"
            >
              Delete Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
