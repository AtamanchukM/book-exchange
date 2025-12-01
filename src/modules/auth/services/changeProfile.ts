import { getAuth, verifyBeforeUpdateEmail } from "firebase/auth";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/modules/auth/lib/firebase/firebase";
import { useAuthStore } from "@/modules/auth";
import type { ProfileFormValues } from "@/modules/auth/types/auth.types";

export const changeProfile = async (
  userId: string,
  values: ProfileFormValues,
  setSubmitting: (v: boolean) => void
) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  try {
    // Якщо email змінився — оновлюємо через Firebase Auth
    if (currentUser && values.email && values.email !== currentUser.email) {
      await verifyBeforeUpdateEmail(currentUser, values.email);
      alert(
        "На нову адресу надіслано лист для підтвердження. Підтвердіть email, щоб завершити зміну."
      );
      setSubmitting(false);
      return;
    }
    await updateDoc(doc(db, "users", userId), {
      name: values.name,
      email: values.email,
      avatar: values.avatar,
    });

    // Оновити ім'я у всіх книгах користувача
    const booksRef = collection(db, "books");
    const q = query(booksRef, where("ownerId", "==", userId));
    const booksSnap = await getDocs(q);
    const updateBookPromises: Promise<any>[] = [];
    booksSnap.forEach((docSnap) => {
      updateBookPromises.push(
        updateDoc(doc(db, "books", docSnap.id), { ownerName: values.name })
      );
    });
    await Promise.all(updateBookPromises);

    useAuthStore.setState((prev) => ({
      user: prev.user
        ? {
            ...prev.user,
            name: values.name,
            email: values.email,
            avatar: values.avatar,
          }
        : undefined,
    }));
    alert("Профіль і книги успішно оновлено!");
  } catch (e: any) {
    if (e.code === "auth/requires-recent-login") {
      alert("Для зміни email потрібно повторно увійти в акаунт.");
    } else {
      alert("Помилка при оновленні профілю: " + (e.message || e));
    }
  } finally {
    setSubmitting(false);
  }
};
