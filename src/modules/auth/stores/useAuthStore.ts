import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  registerService,
  loginService,
  restoreService,
  logoutService,
} from "@/modules/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/modules/auth/lib/firebase/firebase";

import type { AuthState } from "@/modules/auth/types/auth.types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      success: null,

      register: async (name, email, password, location) => {
        set({ loading: true, error: null, success: null });
        const { user, error } = await registerService(
          name,
          email,
          password,
          location,
        );
        if (user) {
          set({ user, loading: false, error: null });
        } else {
          set({ error, loading: false, user: null });
        }
      },

      login: async (email, password) => {
        set({ loading: true, error: null, success: null });
        const { user, error } = await loginService(email, password);
        if (user) {
          set({ user, loading: false, error: null });
        } else {
          set({ error, loading: false, user: null });
        }
      },

      restore: async (restoreEmail) => {
        set({ loading: true, error: null, success: null });
        const { error } = await restoreService(restoreEmail);
        if (!error) {
          set({
            loading: false,
            success:
              "Лист для відновлення паролю надіслано на вашу електронну пошту.",
            error: null,
          });
        } else {
          set({ error, loading: false, success: null });
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        const { error } = await logoutService();
        if (!error) {
          set({ user: null, loading: false, error: null, success: null });
        } else {
          set({ error, loading: false });
        }
      },

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error, loading: false }),
      resetAuth: () =>
        set({ user: null, loading: false, error: null, success: null }),

      // Ініціалізація: синхронізація з Firebase Auth
      initializeAuth: async () => {
        set({ loading: true });
        return new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
              // Користувач є в Firebase - завантажуємо його дані
              const token = await firebaseUser.getIdToken();
              // Спробуємо отримати дані з Firestore (якщо вони були)
              const storedUser = useAuthStore.getState().user;
              if (storedUser) {
                set({
                  user: { ...storedUser, token },
                  loading: false,
                  error: null,
                });
              } else {
                // Якщо у store немає користувача, створюємо мінімальний об'єкт
                set({
                  user: {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || "",
                    name: firebaseUser.displayName || "",
                    token,
                    role: "user",
                    avatar: "",
                  },
                  loading: false,
                  error: null,
                });
              }
            } else {
              // Користувачі немає - очищуємо store
              set({ user: null, loading: false, error: null });
            }
            unsubscribe();
            resolve();
          });
        });
      },
    }),
    { name: "auth-storage" },
  ),
);
