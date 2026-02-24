import { useMemo } from "react";
import { useBooks } from "./useBooks";

export function useUserBooks(
  userId: string | undefined,
  pageSize: number = 10,
) {
  const {
    books: allBooks,
    loading,
    loadMore,
    hasMore,
  } = useBooks(pageSize, userId, Boolean(userId));

  const books = useMemo(() => {
    if (!userId) return [];
    return allBooks.filter((book) => book.ownerId === userId);
  }, [allBooks, userId]);

  return { books, loading, error: null, loadMore, hasMore };
}
