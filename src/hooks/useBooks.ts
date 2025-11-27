import { useEffect, useState } from "react";
import { fetchBooks } from "@/services/fetchBooks";
import type { BookData } from "@/types/book";
// import {fetchBooksPaginated} from "@/services/fetchBooks";

export function useBooks() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, [books]);

  return { books, loading };
}