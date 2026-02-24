 import { collection, getDocs } from "firebase/firestore";
import { db } from "@/modules/auth/lib/firebase/firebase";
 
 export const fetchAllUsers = async () => {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    return userSnapshot.docs.map((doc) => doc.data());
  };