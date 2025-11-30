import { useEffect, useState } from "react";
import { fetchBooks } from "@/services/fetchBooks";
import type { BookData } from "@/types/book";

export function useBooks(pageSize: number = 3) {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      const { books: initialBooks, lastVisible: initialLastVisible } =
        await fetchBooks(pageSize);
      setBooks(initialBooks);
      setLastVisible(initialLastVisible);
      setLoading(false);
    };
    loadInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, reloadTrigger]);

  const loadMore = async () => {
    if (!lastVisible) return;
    setLoading(true);
    const { books: nextBooks, lastVisible: nextLastVisible } = await fetchBooks(
      pageSize,
      lastVisible
    );
    setBooks((prev) => [...prev, ...nextBooks]);
    setLastVisible(nextLastVisible);
    setLoading(false);
  };

  const hasMore = !!lastVisible;

  return { books, loading, loadMore, hasMore, setReloadTrigger, reloadTrigger };
}
