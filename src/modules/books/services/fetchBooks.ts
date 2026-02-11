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
import { db } from "@/modules/auth/lib/firebase/firebase";
const booksCollection = collection(db, "books");

export const fetchBooks = async (
  pageSize: number,
  lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null = null,
): Promise<{
  books: BookData[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  let q;

  const baseQuery = query(booksCollection, orderBy("name"));

  if (lastVisibleDoc) {
    q = query(baseQuery, startAfter(lastVisibleDoc), limit(pageSize));
  } else {
    q = query(baseQuery, limit(pageSize));
  }

  const querySnapshot = await getDocs(q);
  const booksList: BookData[] = [];
  querySnapshot.forEach((doc) => {
    booksList.push({ ...doc.data(), id: doc.id } as BookData);
  });

  const newLastVisible =
    querySnapshot.docs[querySnapshot.docs.length - 1] || null;

  return { books: booksList, lastVisible: newLastVisible };
};
