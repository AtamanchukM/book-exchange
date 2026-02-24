import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/modules/auth/lib/firebase/firebase";
import type { BookData } from "@/modules/books";

export function useBookDetails(id: string | string[] | undefined) {
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookId = Array.isArray(id) ? id[0] : id;
    let isCancelled = false;

    const fetchBook = async () => {
      if (!bookId) {
        setBook(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const ref = doc(db, "books", bookId);
        const snap = await getDoc(ref);

        if (isCancelled) return;

        if (snap.exists()) {
          setBook({ id: snap.id, ...(snap.data() as Omit<BookData, "id">) });
        } else {
          setBook(null);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchBook();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return { book, loading };
}
