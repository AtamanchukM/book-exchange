import { getAuth, verifyBeforeUpdateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
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
    alert("Профіль успішно оновлено!");
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
