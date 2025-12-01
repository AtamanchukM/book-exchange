import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  registerService,
  loginService,
  restoreService,
  logoutService,
} from "@/modules/auth";

import type { AuthState } from "@/modules/auth/types/auth.types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      success: null,

      register: async (name, email, password) => {
        set({ loading: true, error: null });
        const { user, error } = await registerService(name, email, password);
        if (user) set({ user, loading: false });
        if (error) set({ error, loading: false });
      },

      login: async (email, password) => {
        set({ loading: true, error: null });
        const { user, error } = await loginService(email, password);
        if (user) set({ user, loading: false });
        if (error) set({ error, loading: false });
      },

      restore: async (restoreEmail) => {
        set({ loading: true, error: null, success: null });
        const { error } = await restoreService(restoreEmail);
        if (!error) {
          set({
            loading: false,
            success:
              "Лист для відновлення паролю надіслано на вашу електронну пошту.",
          });
        } else {
          set({ error, loading: false, success: null });
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        const { error } = await logoutService();
        if (!error) {
          set({ user: null, loading: false });
        } else {
          set({ error, loading: false });
        }
      },

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error, loading: false, user: null }),
      resetAuth: () => set({ user: null, loading: false, error: null }),
    }),
    { name: "auth-storage" }
  )
);
