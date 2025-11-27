import { setDoc, doc } from "@firebase/firestore";
import { booksCollection } from "@/lib/firebase/firebase";
import type { BookData } from "@/types/book";
import { useAuthStore } from "@/stores/useAuthStore";

export const addBook = async (bookData: BookData) => {
  const user = useAuthStore.getState().user;
  try {
    // Використовуємо setDoc, щоб id документа збігався з id книги
    await setDoc(doc(booksCollection, bookData.id), {
      ...bookData,
      createdAt: new Date(),
      ownerName: user?.name,
      ownerId: user?.uid,
      ownerEmail: user?.email,
    });
    console.log("Книга успішно додана з ID: ", bookData.id);
    return bookData.id;
  } catch (e) {
    console.error("Помилка при додаванні книги: ", e);
    throw e;
  }
};
