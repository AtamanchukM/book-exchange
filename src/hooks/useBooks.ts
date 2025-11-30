import { useEffect, useState } from "react";
import { fetchBooks } from "@/services/books/fetchBooks";
import type { BookData } from "@/types/book";
import { create } from "zustand";

export const useBooksStore = create<{
  Allbooks: BookData[];
  setAllBooks: (books: BookData[]) => void;
}>((set) => ({
  Allbooks: [],
  setAllBooks: (books) => set({ Allbooks: books }),
}));

export function useBooks(pageSize: number = 3) {
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const Allbooks = useBooksStore((s) => s.Allbooks);
  const setAllBooks = useBooksStore((s) => s.setAllBooks);

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      const { books: initialBooks, lastVisible: initialLastVisible } =
        await fetchBooks(pageSize);
      setAllBooks(initialBooks);
      setLastVisible(initialLastVisible);
      setLoading(false);
    };
    loadInitial();
  }, [pageSize, reloadTrigger, setAllBooks]);

  const loadMore = async () => {
    if (!lastVisible) return;
    setLoading(true);
    const { books: nextBooks, lastVisible: nextLastVisible } = await fetchBooks(
      pageSize,
      lastVisible
    );
    setAllBooks([...Allbooks, ...nextBooks]);
    setLastVisible(nextLastVisible);
    setLoading(false);
  };

  const hasMore = !!lastVisible;

  return {
    Allbooks,
    loading,
    loadMore,
    hasMore,
    setReloadTrigger,
    reloadTrigger,
  };
}
