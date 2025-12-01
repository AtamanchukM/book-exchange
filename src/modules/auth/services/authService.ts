import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "@/modules/auth/lib/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function registerService(
  name: string,
  email: string,
  password: string
) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const token = await res.user.getIdToken();
  await setDoc(doc(db, "users", res.user.uid), {
    uid: res.user.uid,
    name,
    email,
    role: "user",
    createdAt: new Date().toISOString(),
  });
  return {
    uid: res.user.uid,
    email: res.user.email!,
    name,
    role: "user",
    token,
  };
}

export async function loginService(email: string, password: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const token = await res.user.getIdToken();
    const userDoc = await getDoc(doc(db, "users", res.user.uid));
    const role = userDoc.exists() ? userDoc.data().role : "user";
    const name = userDoc.exists() ? userDoc.data().name : "";
    const avatar = userDoc.exists() ? userDoc.data().avatar : "";
    console.log("avatar:", avatar);
    return {
      user: {
        uid: res.user.uid,
        email: res.user.email!,
        name,
        role,
        token,
        avatar
      }
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function restoreService(restoreEmail: string) {
  try {
    await sendPasswordResetEmail(auth, restoreEmail);
    return {};
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function logoutService() {
  try {
    await auth.signOut();
    return {};
  } catch (error: any) {
    return { error: error.message };
  }
}
