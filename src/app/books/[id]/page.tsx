"use client";

import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useAuthStore } from "@/stores/useAuthStore";
import { sendBookExchangeEmail } from "@/services/bookExchange";
import BookList from "@/components/books/BookList";
import { fetchBooks } from "@/services/fetchBooks";

export default function BookDetailsPage() {
  const { id } = useParams(); // отримуємо id з URL
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((s) => s.user);
  const [books, setBooks] = useState<any[]>([]);


  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      const ref = doc(db, "books", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setBook({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };
    fetchBook();
  }, [id]);

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

  if (loading) return <div>Завантаження...</div>;
  if (!book) return <div>Книгу не знайдено</div>;

  const handleExchange = async () => {
    if (!user) return alert("Спочатку увійдіть у систему");
    if (book.ownerId === user.uid)
      return alert("Не можна запросити обмін на свою книгу");

    try {
      await sendBookExchangeEmail({
        user,
        book,
        toEmail: book.ownerEmail,
        offeredBooks: books, // TODO: replace with actual offered books if needed
      });
      alert("Запит на обмін відправлено!");
    } catch {
      alert("Сталася помилка при відправці запиту на обмін");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md flex flex-col gap-4 w-fit m-auto mt-10 bg-gray-700">
      <h1 className="text-2xl font-bold">{book.name}</h1>
      <p>Автор: {book.author}</p>
      <p>Власник: {book.ownerName}</p>

      <button
        onClick={handleExchange}
        className="border border-blue-600 px-2 py-1 rounded bg-blue-400 mt-4"
      >
        Запросити обмін
      </button>
    </div>
  );
}
