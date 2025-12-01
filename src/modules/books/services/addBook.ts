import { setDoc, doc } from "@firebase/firestore";
import { booksCollection } from "@/modules/auth/lib/firebase/firebase";
import type { BookData } from "@/modules/books/types/book.types";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { useUserBooksStore } from "@/modules/books/hooks/useUserBooks";

export const addBook = async (bookData: BookData) => {
  const user = useAuthStore.getState().user;
  const books = useUserBooksStore.getState().books;

  try {
    // Використовуємо setDoc, щоб id документа збігався з id книги
    await setDoc(doc(booksCollection, bookData.id), {
      ...bookData,
      createdAt: new Date(),
      ownerName: user?.name,
      ownerId: user?.uid,
      ownerEmail: user?.email,
    });
    useUserBooksStore.setState({ books: [...books, bookData] });
    console.log("Книга успішно додана з ID: ", bookData.id);

    return bookData.id;
  } catch (e) {
    console.error("Помилка при додаванні книги: ", e);
    throw e;
  }
};
