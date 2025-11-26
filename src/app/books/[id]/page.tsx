"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useAuthStore } from "@/stores/useAuthStore";
// import { requestExchange } from "@/services/exchangeService";

export default function BookDetailsPage() {
  const { id } = useParams(); // отримуємо id з URL
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((s) => s.user);

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

  if (loading) return <div>Завантаження...</div>;
  if (!book) return <div>Книгу не знайдено</div>;

  const handleExchange = async () => {
    if (!user) return alert("Спочатку увійдіть у систему");
    if (book.ownerId === user.uid) return alert("Не можна запросити обмін на свою книгу");

    // await requestExchange(book, user);
    alert("Запит на обмін відправлено!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{book.name}</h1>
      <p>Автор: {book.author}</p>
      <p>Власник: {book.ownerName}</p>
      {book.photoUrl && <img src={book.photoUrl} alt={book.name} className="w-64 mt-4" />}

      <button
        onClick={handleExchange}
        className="btn-primary mt-4"
      >
        Запросити обмін
      </button>
    </div>
  );
}