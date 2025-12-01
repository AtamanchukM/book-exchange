import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { BookData } from "@/modules/books/types/book.types";
// Припускаємо, що 'db' - це ваш екземпляр Firestore
// const db = getFirestore(app);
import { db } from "@/modules/auth/lib/firebase/firebase"; // Замініть на ваш шлях до конфігурації Firebase

const booksCollection = collection(db, "books"); // Ваш об'єкт колекції

export const fetchBooks = async (
  pageSize: number, // Кількість книг для завантаження, наприклад, 5
  lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null = null // Останній видимий документ з попереднього завантаження
): Promise<{
  books: BookData[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  let q;

  // Базовий запит з сортуванням і лімітом
  const baseQuery = query(booksCollection, orderBy("name"));

  if (lastVisibleDoc) {
    // Якщо є lastVisibleDoc, починаємо після нього
    q = query(baseQuery, startAfter(lastVisibleDoc), limit(pageSize));
  } else {
    // Якщо це перше завантаження, просто застосовуємо ліміт
    q = query(baseQuery, limit(pageSize));
  }

  const querySnapshot = await getDocs(q);
  const booksList: BookData[] = [];
  querySnapshot.forEach((doc) => {
    booksList.push({ ...doc.data(), id: doc.id } as BookData);
  });

  // Зберігаємо останній документ, щоб використовувати його для наступного запиту
  const newLastVisible =
    querySnapshot.docs[querySnapshot.docs.length - 1] || null;

  return { books: booksList, lastVisible: newLastVisible };
};
