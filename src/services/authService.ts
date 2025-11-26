// import { auth, db } from "@/lib/firebase/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// // Реєстрація користувача: створює користувача у Firebase Auth і додає документ у Firestore
// export const registerUser = async (name: string, email: string, password: string) => {
//   const res = await createUserWithEmailAndPassword(auth, email, password);
//   await setDoc(doc(db, "users", res.user.uid), {
//     name,
//     email,
//     role: "user",
//     createdAt: new Date(),
//   });
//   return res.user;
// };

// // Логін користувача: повертає user (Firebase User) і роль з Firestore
// export const loginUser = async (email: string, password: string) => {
//   const res = await signInWithEmailAndPassword(auth, email, password);
//   const userDoc = await getDoc(doc(db, "users", res.user.uid));
//   // Якщо документа немає, роль буде undefined
//   return { user: res.user, role: userDoc.data()?.role };
// };
