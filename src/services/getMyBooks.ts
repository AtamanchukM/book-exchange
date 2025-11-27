import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export async function getMyBooks(uid: string) {
  const booksRef = collection(db, "books");
  const q = query(booksRef, where("ownerId", "==", uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}