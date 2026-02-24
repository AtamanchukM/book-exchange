import { useEffect, useState } from "react";
import { fetchBooks } from "@/modules/books";
import type { BookData } from "@/modules/books";
import { create } from "zustand";

type FetchBooksResult = Awaited<ReturnType<typeof fetchBooks>>;
type LastVisibleDoc = FetchBooksResult["lastVisible"];

export const useBooksStore = create<{
  books: BookData[];
  setBooks: (books: BookData[]) => void;
}>((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
}));

export function useBooks(
  pageSize: number = 10,
  ownerId?: string,
  enabled: boolean = true,
) {
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<LastVisibleDoc>(null);
  const books = useBooksStore((s) => s.books);
  const setBooks = useBooksStore((s) => s.setBooks);

  useEffect(() => {
    if (!enabled) {
      setBooks([]);
      setLastVisible(null);
      setLoading(false);
      return;
    }

    const loadInitial = async () => {
      setLoading(true);
      try {
        const { books: initialBooks, lastVisible: initialLastVisible } =
          await fetchBooks(pageSize, null, ownerId);
        setBooks(initialBooks);
        setLastVisible(initialLastVisible);
      } catch (error) {
        console.error("Error loading books:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, [enabled, pageSize, ownerId, setBooks]);

  const loadMore = async () => {
    if (!enabled) return;
    if (!lastVisible) return;
    setLoading(true);
    try {
      const { books: nextBooks, lastVisible: nextLastVisible } =
        await fetchBooks(pageSize, lastVisible, ownerId);
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
  };
}
