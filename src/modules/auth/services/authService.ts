import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "@/modules/auth/lib/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { AuthUser } from "@/modules/auth/types/auth.types";

type AuthServiceResponse<T> =
  | {
      user: T;
      error: null;
    }
  | {
      user: null;
      error: string;
    };

export async function registerService(
  name: string,
  email: string,
  password: string,
  location: string,
): Promise<AuthServiceResponse<AuthUser>> {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const token = await res.user.getIdToken(true);
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      name,
      email,
      location,
      role: "user",
      createdAt: new Date().toISOString(),
    });
    return {
      user: {
        uid: res.user.uid,
        email: res.user.email!,
        name,
        role: "user",
        location,
        token,
        avatar: "",
      },
      error: null,
    };
  } catch (error: any) {
    return {
      user: null,
      error: error.message || "Помилка при реєстрації",
    };
  }
}

export async function loginService(
  email: string,
  password: string,
): Promise<AuthServiceResponse<AuthUser>> {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const token = await res.user.getIdToken();
    const userDoc = await getDoc(doc(db, "users", res.user.uid));
    const role = userDoc.exists() ? userDoc.data().role : "user";
    const name = userDoc.exists() ? userDoc.data().name : "";
    const avatar = userDoc.exists() ? userDoc.data().avatar : "";
    const location = userDoc.exists() ? userDoc.data().location : "";
    return {
      user: {
        uid: res.user.uid,
        email: res.user.email!,
        name,
        location,
        role,
        token,
        avatar,
      },
      error: null,
    };
  } catch (error: any) {
    return {
      user: null,
      error: error.message || "Помилка при вході",
    };
  }
}

export async function restoreService(
  restoreEmail: string,
): Promise<{ error: string | null }> {
  try {
    await sendPasswordResetEmail(auth, restoreEmail);
    return { error: null };
  } catch (error: any) {
    return {
      error: error.message || "Помилка при відновленні паролю",
    };
  }
}

export async function logoutService(): Promise<{ error: string | null }> {
  try {
    await auth.signOut();
    return { error: null };
  } catch (error: any) {
    return {
      error: error.message || "Помилка при виході",
    };
  }
}
