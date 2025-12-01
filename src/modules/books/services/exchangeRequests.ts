import { db } from "@/modules/auth/lib/firebase/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
// Додає новий exchange request у Firestore
export async function createExchangeRequest({
  userId,
  message,
  status = "pending",
  createdAt = new Date().toISOString(),
}: {
  userId: string;
  message: string;
  status?: "pending" | "accepted" | "rejected";
  createdAt?: string;
}) {
  const docRef = await addDoc(collection(db, "exchangeRequests"), {
    userId,
    message,
    status,
    createdAt,
  });
  return docRef.id;
}

import type { ExchangeRequest } from "@/modules/books";

export async function getExchangeRequestsForUser(userId: string): Promise<ExchangeRequest[]> {
  const q = query(
    collection(db, "exchangeRequests"),
    where("userId", "==", userId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ExchangeRequest[];
}
