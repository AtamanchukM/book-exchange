import { useEffect, useState } from "react";
import { fetchUserBooks } from "@/services/fetchUserBooks";
import type { BookData } from "@/types/book";

export function useUserBooks(userId: string | undefined, pageSize: number = 3) {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);

  useEffect(() => {
    if (!userId) {
      setBooks([]);
      setLoading(false);
      return;
    }
    const loadInitial = async () => {
      setLoading(true);
      const { books: initialBooks, lastVisible: initialLastVisible } = await fetchUserBooks(userId, pageSize);
      setBooks(initialBooks);
      setLastVisible(initialLastVisible);
      setLoading(false);
    };
    loadInitial();
  }, [userId, pageSize]);

  const loadMore = async () => {
    if (!userId || !lastVisible) return;
    setLoading(true);
    const { books: nextBooks, lastVisible: nextLastVisible } = await fetchUserBooks(userId, pageSize, lastVisible);
    setBooks((prev) => [...prev, ...nextBooks]);
    setLastVisible(nextLastVisible);
    setLoading(false);
  };

  const hasMore = !!lastVisible;

  const addBook = (book: BookData) => setBooks((prev) => [book, ...prev]);
  const removeBook = (id: string) => setBooks((prev) => prev.filter((b) => b.id !== id));

  return { books, loading, loadMore, hasMore, addBook, removeBook };
}
