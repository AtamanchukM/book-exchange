
import { booksCollection } from "@/lib/firebase/firebase";
import { getDocs, query, orderBy, startAfter, limit, getFirestore, collection } from "@firebase/firestore";
import type { BookData } from "@/types/book";

export const fetchBooks = async (): Promise<BookData[]> => {
  const querySnapshot = await getDocs(booksCollection);
  const booksList: BookData[] = [];
  querySnapshot.forEach((doc) => {
    booksList.push({ ...doc.data(), id: doc.id } as BookData);
  });
  // Сортуємо за алфавітом (name)
  booksList.sort((a, b) => a.name.localeCompare(b.name));
  return booksList;
};


// Пагінація книг
export async function fetchBooksPaginated({
  pageSize = 5,
  lastVisible = null,
  orderField = "createdAt"
}: {
  pageSize?: number;
  lastVisible?: any;
  orderField?: string;
} = {}) {
  let q = query(collection(getFirestore(), "books"), orderBy(orderField), limit(pageSize));
  if (lastVisible) {
    q = query(collection(getFirestore(), "books"), orderBy(orderField), startAfter(lastVisible), limit(pageSize));
  }
  const snap = await getDocs(q);
  const books: BookData[] = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookData));
  
  return {
    books,
    lastVisible: snap.docs[snap.docs.length - 1] || null,
    hasMore: snap.docs.length === pageSize,
  };
}
