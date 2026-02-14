"use client";

import { useAuthStore } from "@/modules/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedAdmin({
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

    // Якщо користувача немає або він не адмін - редиректимо
    if (!user || user.role !== "admin") {
      const timer = setTimeout(() => {
        const currentUser = useAuthStore.getState().user;
        if (!currentUser || currentUser.role !== "admin") {
          router.replace("/books");
        }
        setCheckComplete(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    setCheckComplete(true);
  }, [mounted, user, router]);

  // Поки не змонтується та не перевіримо auth - нічого не рендеримо
  if (!mounted || !checkComplete) return null;

  // Якщо немає користувача або він не адмін - не рендеримо
  if (!user || user.role !== "admin") return null;

  return <>{children}</>;
}
