"use client";

import { useAuthStore } from "@/stores/useAuthStore";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/auth/login");
      useAuthStore.getState().logout();
    }
  }, [mounted, user, router]);

  if (!mounted) return null; // поки не змонтується клієнт — нічого не рендеримо

  return <>{user ? children : null}</>;
}
