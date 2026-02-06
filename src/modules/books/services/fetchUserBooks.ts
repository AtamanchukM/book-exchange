import {
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "@/modules/auth/lib/firebase/firebase";
import { BookData } from "@/modules/books/types/book.types";

export const fetchUserBooks = async (
  userId: string,
  pageSize: number = 10,
  lastVisibleDoc?: any,
) => {
  let q = query(
    collection(db, "books"),
    where("ownerId", "==", userId),
    orderBy("name"),
    limit(pageSize),
  );
  if (lastVisibleDoc) {
    q = query(
      collection(db, "books"),
      where("ownerId", "==", userId),
      orderBy("name"),
      startAfter(lastVisibleDoc),
      limit(pageSize),
    );
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
