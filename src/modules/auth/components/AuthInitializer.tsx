"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";

/**
 * Компонент для ініціалізації автентифікації при завантаженні додатку.
 * Синхронізує Firebase Auth з Zustand store.
 */
export default function AuthInitializer() {
  useEffect(() => {
    // Запускаємо ініціалізацію при монтуванні
    useAuthStore.getState().initializeAuth();
  }, []);

  // Цей компонент нічого не рендерить, тільки запускає логіку
  return null;
}
