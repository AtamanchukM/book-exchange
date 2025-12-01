import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  registerService,
  loginService,
  restoreService,
  logoutService,
} from "@/modules/auth/services/authService";

interface AuthUser {
  uid: string;
  name?: string;
  email: string;
  restoreEmail?: string;
  role?: string;
  token?: string;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  success?: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restore: (email: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetAuth: () => void;
}

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
        if (user) set({ user, loading: false});
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
