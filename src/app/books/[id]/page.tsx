"use client";

import { useParams } from "next/navigation";
import BookItem from "@/modules/books/components/BookItem";
import Container from "@/modules/common/Container";
import ExchangeButton from "@/modules/books/components/exchangeButton";
import { useBookDetails } from "@/modules/books/hooks/useBookDetails";
export default function BookPage() {
  const { id } = useParams();
  const { book, loading } = useBookDetails(id);

  if (loading) return <div>Завантаження...</div>;
  if (!book) return <div>Книгу не знайдено</div>;

  return (
    <Container>
      <BookItem
        book={book}
        renderActions={() => <ExchangeButton book={book} />}
      />
    </Container>
  );
}
