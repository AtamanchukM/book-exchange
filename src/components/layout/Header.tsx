"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";

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
        {user && (
          <span className="mr-4">
            Привіт, {userName} {user.role}
          </span>
        )}
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
