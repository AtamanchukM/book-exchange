import { useEffect, useState } from "react";
import { fetchBooks } from "@/modules/books";
import type { BookData } from "@/modules/books";
import { create } from "zustand";

export const useBooksStore = create<{
  books: BookData[];
  setBooks: (books: BookData[]) => void;
}>((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
}));

export function useBooks(pageSize: number = 10) {
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const books = useBooksStore((s) => s.books);
  const setBooks = useBooksStore((s) => s.setBooks);

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      try {
        const { books: initialBooks, lastVisible: initialLastVisible } =
          await fetchBooks(pageSize);
        setBooks(initialBooks);
        setLastVisible(initialLastVisible);
      } catch (error) {
        console.error("Error loading books:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, [pageSize, reloadTrigger, setBooks]);

  const loadMore = async () => {
    if (!lastVisible) return;
    setLoading(true);
    try {
      const { books: nextBooks, lastVisible: nextLastVisible } =
        await fetchBooks(pageSize, lastVisible);
      setBooks([...books, ...nextBooks]);
      setLastVisible(nextLastVisible);
    } catch (error) {
      console.error("Error loading more books:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasMore = books.length > 0 && lastVisible !== null;

  return {
    books,
    loading,
    loadMore,
    hasMore,
    setReloadTrigger,
    reloadTrigger,
  };
}
