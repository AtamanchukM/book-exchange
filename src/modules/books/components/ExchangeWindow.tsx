"use client";

import { useState } from "react";
import { useAuthStore } from "@/modules/auth";
import { useUserBooks } from "@/modules/books/hooks/useUserBooks";
import { createExchangeRequest } from "@/modules/books/services/exchangeRequests";
import { sendBookExchangeEmail } from "@/modules/books/services/EmailExchangeRequest";
import type { BookData } from "@/modules/books/types/book.types";
import Image from "next/image";

interface ExchangeWindowProps {
  book: BookData;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExchangeWindow({
  book,
  isOpen,
  onClose,
}: ExchangeWindowProps) {
  const user = useAuthStore((state) => state.user);
  const { books, loading } = useUserBooks(user?.uid);

  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // Перевіримо чи користувач намагається обміняти власну книгу
  if (user?.uid === book.ownerId) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <p className="text-lg text-gray-700 mb-4">
            Ви не можете пропонувати обмін на власну книгу
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Закрити
          </button>
        </div>
      </div>
    );
  }

  const handleToggleBook = (bookId: string) => {
    const newSelected = new Set(selectedBooks);
    if (newSelected.has(bookId)) {
      newSelected.delete(bookId);
    } else {
      newSelected.add(bookId);
    }
    setSelectedBooks(newSelected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("Будь ласка, увійдіть в акаунт");
      return;
    }

    if (selectedBooks.size === 0) {
      setError("Виберіть принаймні одну книгу для обміну");
      return;
    }

    if (!message.trim()) {
      setError("Напишіть повідомлення");
      return;
    }

    setIsSubmitting(true);
    try {
      // Отримати назви обраних книг
      const offeredBooksNames = books
        .filter((b) => selectedBooks.has(b.id))
        .map((b) => b.name);

      // Створити запит на обмін
      await createExchangeRequest({
        userId: book.ownerId,
        senderId: user.uid,
        senderName: user.name,
        senderEmail: user.email,
        bookId: book.id,
        bookName: book.name,
        offeredBooks: Array.from(selectedBooks).join(", "),
        offeredBooksNames,
        message,
      });

      // Відправити email
      await sendBookExchangeEmail({
        user: { email: user.email, name: user.name },
        book: { name: book.name },
        offeredBooks: books
          .filter((b) => selectedBooks.has(b.id))
          .map((b) => ({ name: b.name })),
        toEmail: book.ownerEmail || "",
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSelectedBooks(new Set());
        setMessage("");
        setSuccess(false);
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Помилка при відправці запиту",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-stone-900">
            Запропонувати обмін
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Повідомлення про успіх */}
          {success && (
            <div className="p-4 bg-green-100 text-green-800 rounded-lg">
              ✅ Пропозиція обміну успішно відправлена!
            </div>
          )}

          {/* Помилка */}
          {error && (
            <div className="p-4 bg-red-100 text-red-800 rounded-lg">
              ❌ {error}
            </div>
          )}

          {/* Книга для обміну */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Книга, яку Ви хочете обміняти:
            </label>
            <div className="flex gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              {book.photoUrl && (
                <div className="shrink-0">
                  <Image
                    src={book.photoUrl}
                    alt={book.name}
                    width={80}
                    height={120}
                    className="rounded object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-stone-900">
                  {book.name}
                </h3>
                <p className="text-amber-700 font-medium">{book.author}</p>
                {book.ownerLocation && (
                  <p className="text-sm text-gray-600 mt-1">
                    📍 {book.ownerLocation}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-2">
                  Власник:{" "}
                  <span className="font-semibold">{book.ownerName}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Вибір своїх книг */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Виберіть свої книги для обміну:
            </label>
            {loading ? (
              <p className="text-gray-500">Завантаження ваших книг...</p>
            ) : books.length === 0 ? (
              <p className="text-gray-500">
                У вас немає книг. Спочатку додайте свої книги.
              </p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                {books.map((myBook) => (
                  <label
                    key={myBook.id}
                    className="flex items-center p-3 hover:bg-white rounded cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBooks.has(myBook.id)}
                      onChange={() => handleToggleBook(myBook.id)}
                      className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-stone-900">
                        {myBook.name}
                      </p>
                      <p className="text-sm text-gray-600">{myBook.author}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
            {selectedBooks.size > 0 && (
              <p className="text-sm text-amber-700 mt-2 font-semibold">
                Вибрано: {selectedBooks.size} книг(и)
              </p>
            )}
          </div>

          {/* Повідомлення */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ваше повідомлення:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Напишіть причину обміну або коментар (обов'язково)..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              rows={4}
            />
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:bg-gray-100"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting || selectedBooks.size === 0}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400 font-semibold transition"
            >
              {isSubmitting ? "Відправляння..." : "Запропонувати обмін"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
