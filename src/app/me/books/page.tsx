"use client";
import { fetchBooks } from "@/services/fetchBooks";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import type { BookData } from "@/types/book";
import { addBook } from "@/services/addBook";
import { deleteBook } from "@/services/deleteBook";
import Link from "next/dist/client/link";

export default function Mybooks() {
  const [books, setBooks] = useState<BookData[]>([]);
  const user = useAuthStore((state) => state.user);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");

  const fetchUserBooks = async () => {
    const allBooks = await fetchBooks();
    if (user) {
      setBooks(allBooks.filter((book) => book.ownerId === user.uid));
    }
  };

  useEffect(() => {
    const loadBooks = async () => {
      await fetchUserBooks();
    };
    loadBooks();
  }, [user]);

  return (
    <div>
      My Books Page
      <ul className="flex gap-4">
        {books.map((book: BookData) => (
          <li key={book.id} className="text-white mb-2 border p-4 rounded">
            <h2 className="text-xl font-semibold">{book.name}</h2>
            <p className="text-gray-300">Автор: {book.author}</p>
            <p>Власник: {book.ownerName}</p>
            <Link
              href={`/books/${book.id}`}
              className="border py-2 px-4 bg-green-400 flex w-fit "
            >
              Details
            </Link>

            <button
              onClick={async () => {
                await deleteBook(book.id);
                await fetchUserBooks();
              }}
              className="border border-red-600 px-2 py-1 rounded bg-red-400"
            >
              Delete Book
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="border"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        placeholder="Book Name"
      />
      <input
        type="text"
        className="border"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <button
        onClick={async () => {
          await addBook({
            id: `${Math.floor(Math.random() * 10000)}`,
            name: bookName,
            author: author,
            createdAt: new Date().toISOString(),
            ownerId: user?.uid || "",
            ownerName: user?.name || "",
          });
          await fetchUserBooks();
        }}
      >
        Add Book
      </button>
    </div>
  );
}
