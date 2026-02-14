"use client";
import { useState } from "react";
import ExchangeWindow from "./ExchangeWindow";
import type { BookData } from "@/modules/books/types/book.types";

interface ExchangeButtonProps {
  book: BookData;
}

export default function ExchangeButton({ book }: ExchangeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full px-4 py-2 text-white transition-colors duration-300 rounded bg-amber-400 hover:bg-amber-500"
      >
        Запропонувати обмін
      </button>
      <ExchangeWindow
        book={book}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
