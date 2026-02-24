import { setDoc, doc } from "@firebase/firestore";
import { booksCollection } from "@/modules/auth/lib/firebase/firebase";
import type { BookData } from "@/modules/books/types/book.types";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { useBooksStore } from "@/modules/books/hooks/useBooks";

export const addBook = async (bookData: BookData) => {
  const user = useAuthStore.getState().user;
  const allBooks = useBooksStore.getState().books;

  try {
    // Використовуємо setDoc, щоб id документа збігався з id книги
    await setDoc(doc(booksCollection, bookData.id), {
      ...bookData,
      createdAt: new Date(),
      ownerName: user?.name,
      ownerLocation: user?.location || "",
      ownerId: user?.uid,
      ownerEmail: user?.email,
      category: bookData.category,
      description: bookData.description,
    });

    // Оновлюємо store
    useBooksStore.setState({ books: [...allBooks, bookData] });

    console.log("Книга успішно додана з ID: ", bookData.id);
    console.log(user);

    return bookData.id;
  } catch (e) {
    console.error("Помилка при додаванні книги: ", e);
    throw e;
  }
};
