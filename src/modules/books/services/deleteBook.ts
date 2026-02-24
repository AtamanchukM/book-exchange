import { doc, deleteDoc, getDoc } from "@firebase/firestore";
import { booksCollection } from "@/modules/auth/lib/firebase/firebase";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { useBooksStore } from "@/modules/books/hooks/useBooks";

export const deleteBook = async (bookId: string) => {
  const allBooks = useBooksStore.getState().books;
  const user = useAuthStore.getState().user;
  if (!user) throw new Error("Not authenticated");
  // Отримуємо книгу, щоб перевірити ownerId
  const bookDoc = await getDoc(doc(booksCollection, bookId));
  const bookData = bookDoc.data();
  console.log("bookData:", bookData);
  if (!bookData) throw new Error("Книга не знайдена");
  if (user.role === "user" && user.uid !== bookData.ownerId) {
    throw new Error("Ви можете видаляти тільки свої книги");
  }
  try {
    await deleteDoc(doc(booksCollection, bookId));
    useBooksStore.setState({
      books: allBooks.filter((book) => book.id !== bookId),
    });

    console.log("Книга успішно видалена з ID:", bookId);
  } catch (e) {
    console.error("Помилка при видаленні книги:", e);
    throw e;
  }
};
