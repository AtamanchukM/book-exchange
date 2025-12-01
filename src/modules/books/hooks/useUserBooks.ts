import { useEffect, useState } from "react";
import { fetchUserBooks } from "@/modules/books";
import { create } from "zustand";
import type { BookData } from "@/modules/books";
export const useUserBooksStore = create<{
  books: BookData[];
  setBooks: (books: BookData[]) => void;
}>((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
}));

export function useUserBooks(userId: string | undefined, pageSize: number = 3) {
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const books = useUserBooksStore((s) => s.books);
  const setBooks = useUserBooksStore((s) => s.setBooks);

  useEffect(() => {
    let ignore = false;
    const loadInitial = async () => {
      if (!userId) {
        if (!ignore) setBooks([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { books: initialBooks, lastVisible: initialLastVisible } = await fetchUserBooks(userId, pageSize);
      if (!ignore) setBooks(initialBooks);
      setLastVisible(initialLastVisible);
      setLoading(false);
    };
    loadInitial();
    return () => { ignore = true; };
  }, [userId, pageSize, setBooks]);

  const loadMore = async () => {
    if (!userId || !lastVisible) return;
    setLoading(true);
    const { books: nextBooks, lastVisible: nextLastVisible } = await fetchUserBooks(userId, pageSize, lastVisible);
    setBooks([...books, ...nextBooks]);
    setLastVisible(nextLastVisible);
    setLoading(false);
  };

  const hasMore = !!lastVisible;

  return { books, loading, loadMore, hasMore };
}
