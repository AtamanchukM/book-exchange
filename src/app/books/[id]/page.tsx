"use client";

import { useParams } from "next/navigation";
import BookItem from "@/modules/books/components/BookItem";
import Container from "@/modules/common/Container";
import ExchangeButton from "@/modules/books/components/exchangeButton";
import { useBookDetails } from "@/modules/books/hooks/useBookDetails";
import ExchangeWindow from "@/modules/books/components/ExchangeWindow";
import { useState } from "react";
export default function BookPage() {
  const { id } = useParams();
  const { book, loading } = useBookDetails(id);
  const [isExchangeWindowOpen, setIsExchangeWindowOpen] = useState(false);

  if (loading) return <div>Завантаження...</div>;
  if (!book) return <div>Книгу не знайдено</div>;

  return (
    <Container className="mt-20">
      <div className="flex gap-8 md:gap-12">
        {/* Зліва: Фото книги */}
        <div className="shrink-0 w-full md:w-80">
          <BookItem book={book} />
        </div>

        {/* Справа: Інформація */}
        <div className="flex-1 space-y-6">
          {/* Назва книги */}
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              {book.name}
            </h1>
            <p className="text-lg text-amber-700 font-semibold">
              {book.author}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Власник: {book.ownerName}</p>
            <p className="text-sm text-gray-600">Email: {book.ownerEmail}</p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-600">📍 Місцезнаходження:</p>
            <p className="text-lg font-semibold text-stone-900">
              {book.ownerLocation}
            </p>
          </div>

          {/* Категорія */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Категорія:</p>
            <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              {book.category}
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900 mb-2">Опис:</h3>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
          <div className="">
            <ExchangeButton
              book={book}
              onClick={() => setIsExchangeWindowOpen(true)}
            />
            <ExchangeWindow
              book={book}
              isOpen={isExchangeWindowOpen}
              onClose={() => setIsExchangeWindowOpen(false)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
