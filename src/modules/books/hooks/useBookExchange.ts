import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { useBooks, useUserBooks } from "@/modules/books";

export function useBookExchange(book: any) {
  const user = useAuthStore((s) => s.user);
  const books = useBooks().books;
  // const userBooks = user ? books.filter((b) => b.ownerId === user.uid) : [];
  const userBooks = useUserBooks(user?.uid).books;
  const toEmail = book?.ownerEmail || "";
  return { user, userBooks, toEmail };
}
