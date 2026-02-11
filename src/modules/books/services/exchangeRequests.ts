import { db } from "@/modules/auth/lib/firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
// Додає новий exchange request у Firestore
export async function createExchangeRequest({
  userId,
  senderId,
  senderName,
  senderEmail,
  bookId,
  bookName,
  offeredBooks,
  message,
  status = "pending",
  createdAt = new Date().toISOString(),
}: {
  userId: string;
  senderId?: string;
  senderName?: string;
  senderEmail?: string;
  bookId?: string;
  bookName?: string;
  offeredBooks?: string;
  message: string;
  status?: "pending" | "accepted" | "rejected";
  createdAt?: string;
}) {
  const docRef = await addDoc(collection(db, "exchangeRequests"), {
    userId,
    senderId,
    senderName,
    senderEmail,
    bookId,
    bookName,
    offeredBooks,
    message,
    status,
    createdAt,
  });
  return docRef.id;
}

import type { ExchangeRequest } from "@/modules/books";

export async function getExchangeRequestsForUser(
  userId: string,
): Promise<ExchangeRequest[]> {
  const q = query(
    collection(db, "exchangeRequests"),
    where("userId", "==", userId),
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ExchangeRequest[];
}

// Отримати вхідні запити (які надіслали мені)
export async function getIncomingRequests(
  userId: string,
): Promise<ExchangeRequest[]> {
  const q = query(
    collection(db, "exchangeRequests"),
    where("userId", "==", userId),
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ExchangeRequest[];
}

// Отримати вихідні запити (які я надіслав)
export async function getOutgoingRequests(
  userId: string,
): Promise<ExchangeRequest[]> {
  const q = query(
    collection(db, "exchangeRequests"),
    where("senderId", "==", userId),
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ExchangeRequest[];
}

// Оновити статус запиту
export async function updateRequestStatus(
  requestId: string,
  status: "accepted" | "rejected",
): Promise<void> {
  const requestRef = doc(db, "exchangeRequests", requestId);
  await updateDoc(requestRef, { status });
}
