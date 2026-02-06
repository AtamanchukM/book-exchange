"use client";

import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { useEffect, useState } from "react";
import { fetchUserBooks } from "@/modules/books/services/fetchUserBooks";
import { getExchangeRequestsForUser } from "@/modules/books/services/exchangeRequests";
import Image from "next/image";
import ProfileForm from "@/modules/profile/components/ProfileForm";
import { BookData, ExchangeRequest } from "@/modules/books/types/book.types";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.uid;
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(() => {
    if (!userId) return;
    fetchUserBooks(userId).then((res) => {
      setBooks(res.books);
    });
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    getExchangeRequestsForUser(userId).then(setRequests);
  }, [userId]);

  return (
    <div className="flex justify-center items-center min-h-[80vh]  py-8 px-2">
      <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10 text-gray-100">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={user?.avatar || "/default-avatar.png"}
            alt="Аватар користувача"
            width={120}
            height={120}
            className="rounded-full border-4 border-amber-400 shadow-lg mb-4 object-cover w-[120px] h-[120px]"
          />
          <h1 className="text-3xl font-bold mb-1 text-amber-300">Профіль</h1>
          <span className="text-lg text-amber-200 font-medium mb-2">
            {user?.name}
          </span>
        </div>
        <div className="mb-6">
          <ProfileForm />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 bg-gray-700 rounded-lg p-4 flex flex-col items-center shadow border border-gray-600">
            <span className="text-amber-300 text-lg font-semibold">
              Кількість книг
            </span>
            <span className="text-2xl font-bold mt-1 text-white">
              {books.length}
            </span>
          </div>
          <div className="flex-1 bg-gray-700 rounded-lg p-4 flex flex-col items-center shadow border border-gray-600">
            <span className="text-amber-300 text-lg font-semibold">
              Запити на обмін
            </span>
            <span className="text-2xl font-bold mt-1 text-white">
              {requests.length}
            </span>
          </div>
        </div>
        <div className="mb-2 border-t border-gray-600 pt-4">
          <h2 className="text-xl font-semibold mb-2 text-amber-200">
            Список запитів на обмін
          </h2>
          <ul className="space-y-2">
            {requests.length === 0 && (
              <li className="text-gray-400">Немає запитів</li>
            )}
            {requests.map((req) => (
              <li
                key={req.id}
                className="bg-gray-700 rounded px-3 py-2 shadow hover:bg-gray-600 transition text-amber-100 border border-gray-600"
              >
                {req.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
