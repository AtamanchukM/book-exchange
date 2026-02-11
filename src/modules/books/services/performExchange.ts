import { db } from "@/modules/auth/lib/firebase/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

/**
 * Виконує обмін книгами між двома користувачами
 * @param bookId1 - ID першої книги
 * @param bookId2 - ID другої книги (або null якщо односторонній обмін)
 * @param owner1Id - ID першого власника
 * @param owner2Id - ID другого власника
 */
export async function performBookExchange(
  bookId1: string,
  owner1Id: string,
  owner2Id: string,
  owner1Name: string,
  owner2Name: string,
): Promise<void> {
  try {
    // Оновити власника першої книги
    const book1Ref = doc(db, "books", bookId1);
    await updateDoc(book1Ref, {
      ownerId: owner2Id,
      ownerName: owner2Name,
    });
    // TEXT iN REWRITE
    console.log(`Book ${bookId1} exchanged successfully`);
  } catch (error) {
    console.error("Error performing exchange:", error);
    throw new Error("Помилка при виконанні обміну");
  }
}

/**
 * Отримати інформацію про книгу за ID
 */
export async function getBookById(bookId: string) {
  const bookRef = doc(db, "books", bookId);
  const bookSnap = await getDoc(bookRef);
  if (bookSnap.exists()) {
    return { id: bookSnap.id, ...bookSnap.data() };
  }
  return null;
}
