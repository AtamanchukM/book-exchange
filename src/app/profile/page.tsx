"use client";

import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { useEffect, useState } from "react";
import { fetchUserBooks } from "@/modules/books/services/fetchUserBooks";
import Image from "next/image";
import ProfileForm from "@/modules/profile/components/ProfileForm";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.uid;
  const [requests, setRequests] = useState<any[]>([]);
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    if (!userId) return;
    fetchUserBooks(userId).then((res) => {
      setBooks(res.books);
    });
  }, [userId]);

  // Заглушка для запитів на обмін
  useEffect(() => {
    // getExchangeRequestsForUser(user?.uid).then(setRequests);
    setRequests([
      { id: 1, message: "Вам надійшов запит на обмін від user2" },
      { id: 2, message: "Ваш запит на обмін прийнято!" },
    ]);
  }, [user?.uid]);

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-gray-800 rounded text-white">
      <h1 className="text-2xl mb-4">Профіль</h1>
      <Image
        src={user?.avatar || "/default-avatar.png"}
        alt="Аватар користувача"
        width={100}
        height={100}
        className="rounded-full mb-4"
      />
      <ProfileForm />
     
      <div className="mb-4">
        Кількість книг: <b>{books.length}</b>
      </div>
      <div>
        <h2 className="text-xl mb-2">Запити на обмін</h2>
        <ul className="list-disc ml-6">
          {requests.length === 0 && <li>Немає запитів</li>}
          {requests.map((req) => (
            <li key={req.id}>{req.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
