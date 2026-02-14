import { BookData } from "../types/book.types";

export function filteredBooks(books: BookData[], query: string) {
  return books.filter(
    (book) =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()),
  );
}
