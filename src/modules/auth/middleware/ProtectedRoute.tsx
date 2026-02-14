"use client";

import { useAuthStore } from "@/modules/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Якщо користувача немає, редиректимо на login
    if (!user) {
      // Даємо Firebase встигнути запустити onAuthStateChanged
      const timer = setTimeout(() => {
        if (!useAuthStore.getState().user) {
          router.replace("/login");
        }
        setCheckComplete(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    setCheckComplete(true);
  }, [mounted, user, router]);

  // Поки не змонтується та не перевіримо auth - нічого не рендеримо
  if (!mounted || !checkComplete) return null;

  // Якщо немає користувача - не рендеримо
  if (!user) return null;

  return <>{children}</>;
}
