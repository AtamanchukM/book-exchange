"use client";
import { fetchBooks } from "@/services/fetchBooks";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import type { BookData } from "@/types/book";
import { addBook } from "@/services/addBook";
import { deleteBook } from "@/services/deleteBook";
import Link from "next/dist/client/link";
import BookList from "@/components/books/BookList";

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
      <BookList
        books={books}
        renderActions={(book) => (
          <button
            onClick={async () => {
              await deleteBook(book.id);
              await fetchUserBooks();
            }}
            className="border border-red-600 px-2 py-1 rounded bg-red-400"
          >
            Delete Book
          </button>
        )}
      />
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
