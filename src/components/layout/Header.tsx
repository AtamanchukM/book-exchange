"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute";

export async function searchBooks(term: string) {
  const booksRef = collection(db, "books");
  const q = query(
    booksRef,
    where("keywords", "array-contains", term.toLowerCase())
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserName(data.name || null);
        }
      }
    };

    fetchUserName();
  }, [user]);

  return (
    <header className="w-full bg-amber-200 p-4">
      <nav className="max-w-7xl mx-auto flex justify-end items-center gap-4">
        <ProtectedRoute>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="search book"
                className="p-2 rounded border  focus:outline-none"
              />
              <button>Search</button>
            </div>
            <span className="mr-4">
              Привіт, {userName} {user?.role}
            </span>
          </div>
        </ProtectedRoute>
        <button onClick={logout} className="">
          Вийти
        </button>
        {user?.role === "admin" && (
          <a href="/admin" className="ml-4">
            Адмін панель
          </a>
        )}
      </nav>
    </header>
  );
}
