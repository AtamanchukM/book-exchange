import {
  collection,
  query,
  orderBy,
  where,
  QueryConstraint,
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
  ownerId?: string,
): Promise<{
  books: BookData[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  const constraints: QueryConstraint[] = [orderBy("name")];

  if (ownerId) {
    constraints.push(where("ownerId", "==", ownerId));
  }

  if (lastVisibleDoc) {
    constraints.push(startAfter(lastVisibleDoc));
  }

  constraints.push(limit(pageSize));

  const q = query(booksCollection, ...constraints);

  const querySnapshot = await getDocs(q);
  const booksList: BookData[] = [];
  querySnapshot.forEach((doc) => {
    booksList.push({ ...doc.data(), id: doc.id } as BookData);
  });

  const newLastVisible =
    querySnapshot.docs[querySnapshot.docs.length - 1] || null;

  return { books: booksList, lastVisible: newLastVisible };
};
