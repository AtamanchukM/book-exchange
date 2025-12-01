import { useEffect, useState } from "react";
import { fetchBookById } from "@/modules/books/services/bookDetailsService";

export function useBookDetails(id: string | string[] | undefined) {
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      const bookData = await fetchBookById(id as string);
      if (bookData) setBook(bookData);
      setLoading(false);
    };
    fetchBook();
  }, [id]);

  return { book, loading };
}