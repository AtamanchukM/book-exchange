import { booksCollection } from "@/lib/firebase/firebase";
import { getDocs } from "@firebase/firestore";

export interface BookData {
  id: string;
  name: string;
  author: string;
  photoUrl?: string;
  createdAt: string;
  ownerName: string;
}

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
