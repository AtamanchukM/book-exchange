import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { useBooks } from "@/modules/books";
import { useMemo } from "react";

export function useBookExchange(book: any) {
  const user = useAuthStore((s) => s.user);
  const books = useBooks().Allbooks;
  const userBooks = useMemo(
    () => (user ? books.filter((b) => b.ownerId === user.uid) : []),
    [user, books]
  );
  const toEmail = book?.ownerEmail || "";
  return { user, userBooks, toEmail };
}
