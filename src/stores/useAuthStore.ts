import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthUser {
  uid: string;
  name?: string;
  email: string;
  role?: string;
  token?: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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

      register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const token = await res.user.getIdToken();

          // Записуємо користувача у Firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            name,
            email,
            role: "user",
            createdAt: new Date().toISOString(),
          });

          set({
            user: {
              uid: res.user.uid,
              email: res.user.email!,
              name: name,
              role: "user",
              token,
            },
            loading: false,
          });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await signInWithEmailAndPassword(auth, email, password);
          const token = await res.user.getIdToken();

          // Отримуємо роль з Firestore
          const userDoc = await getDoc(doc(db, "users", res.user.uid));
          const role = userDoc.exists() ? userDoc.data().role : "user";
          const name = userDoc.exists() ? userDoc.data().name : "";

          set({
            user: {
              uid: res.user.uid,
              email: res.user.email!,
              name: name,
              role,
              token,
            },
            loading: false,
          });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await auth.signOut();
          set({ user: null, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error, loading: false, user: null }),
      resetAuth: () => set({ user: null, loading: false, error: null }),
    }),
    { name: "auth-storage" }
  )
);
