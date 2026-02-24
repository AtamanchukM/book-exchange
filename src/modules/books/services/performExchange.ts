import { db } from "@/modules/auth/lib/firebase/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

async function getUserData(userId: string) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists()
    ? {
        name: userSnap.data().name,
        email: userSnap.data().email,
        location: userSnap.data().location,
      }
    : { name: "", email: "", location: "" };
}

export async function performBookExchange(
  bookId1: string,
  owner1Id: string,
  owner2Id: string,
  offeredBookIds?: string[],
): Promise<void> {
  try {
    if (!bookId1 || !owner1Id || !owner2Id) {
      throw new Error("Недостатньо даних для обміну");
    }

    if (owner1Id === owner2Id) {
      throw new Error("Неможливо передати книгу самому собі");
    }

    // Отримати дані обох користувачів
    const owner2Data = await getUserData(owner2Id);
    const owner1Data = await getUserData(owner1Id);

    // Оновити власника першої книги (передача від owner1 до owner2)
    const book1Ref = doc(db, "books", bookId1);
    await updateDoc(book1Ref, {
      ownerId: owner2Id,
      ownerName: owner2Data.name,
      ownerEmail: owner2Data.email,
      ownerLocation: owner2Data.location,
    });

    // Оновити дані для запропонованих книг (передача від owner2 до owner1)
    if (offeredBookIds && offeredBookIds.length > 0) {
      const updatePromises = offeredBookIds
        .filter(Boolean) // Відфільтрувати пусті строки
        .map((bookId) =>
          updateDoc(doc(db, "books", bookId), {
            ownerId: owner1Id,
            ownerName: owner1Data.name,
            ownerEmail: owner1Data.email,
            ownerLocation: owner1Data.location,
          }),
        );

      await Promise.all(updatePromises);
    }

    console.log(
      `Book exchange completed: ${bookId1} ↔ [${offeredBookIds?.join(", ") || "no books"}]`,
    );
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
