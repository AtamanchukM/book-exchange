import { doc, getDoc } from "firebase/firestore";
import { db } from "@/modules/auth/lib/firebase/firebase";

export async function fetchBookById(id: string) {
  if (!id) return null;
  const ref = doc(db, "books", id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
}
