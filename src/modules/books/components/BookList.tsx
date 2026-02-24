"use client";
import type { BookData } from "@/modules/books/types/book.types";
import React from "react";
import BookItem from "./BookItem";
import Container from "@/modules/common/Container";
import FilterDropdown from "./FilterDropdown";
import { motion } from "motion/react";

type BookListProps = {
  books: BookData[];
  allBooks?: BookData[]; // for filter dropdown
  renderActions?: (book: BookData) => React.ReactNode;
  loading?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
};

export default function BookList({
  books,
  allBooks,
  renderActions,
  loading,
  hasMore,
  loadMore,
}: BookListProps) {
  return (
    <Container>
      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-stone-900">Всі книги</h1>
          <h3 className="text-lg text-stone-400">
            Знайдено {books.length} книг для обміну
          </h3>
        </div>
        <div className="">
          <FilterDropdown books={allBooks || books} />
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {books.map((book, index) => (
          <motion.li
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <BookItem book={book} renderedActions={renderActions?.(book)} />
          </motion.li>
        ))}
      </ul>
      {loading && (
        <p className="mt-6 text-lg text-center text-white">Завантаження...</p>
      )}
      {books.length === 0 && !loading && (
        <p className="mt-6 text-lg text-center text-white">Книги не знайдено</p>
      )}
      {hasMore && loadMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-3 font-medium transition-colors bg-white border rounded-full shadow-sm border-stone-300 text-stone-600 hover:bg-stone-50 "
            disabled={loading}
          >
            Показати більше
          </button>
        </div>
      )}
    </Container>
  );
}
