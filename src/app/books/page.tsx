"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Container from "@/components/common/Container";
import { booksCollection } from "@/lib/firebase/firebase";
import { addDoc, getDocs, setDoc, doc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBooks } from "@/services/fetchBooks";

interface BookData {
  id: string;
  name: string;
  author: string;
  photoUrl?: string;
  createdAt: string;
  ownerName: string;
}

export const addBook = async (bookData: BookData) => {
  try {
    // ВАЖЛИВО: Користувач повинен бути авторизований для цієї операції!
    // Використовуємо setDoc, щоб id документа збігався з id книги
    await setDoc(doc(booksCollection, bookData.id), {
      ...bookData,
      createdAt: new Date(),
    });
    console.log("Книга успішно додана з ID: ", bookData.id);
    return bookData.id;
  } catch (e) {
    console.error("Помилка при додаванні книги: ", e);
    throw e;
  }
};

export default function Books() {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();


  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  return (
    <ProtectedRoute>
      <Container>
        <h1 className="text-white text-3xl font-bold mb-4"></h1>
        <div className="">
          <ul className="border p-6 rounded-lg gap-4 grid grid-cols-3">
            {books.map((book: any) => (
              <li key={book.id} className="text-white mb-2 border p-4 rounded">
                <h2 className="text-xl font-semibold">{book.name}</h2>
                <p className="text-gray-300">Автор: {book.author}</p>
                <p>Власник: {book.ownerName}</p>
                <button
                  onClick={() => {
                    router.push(`/books/${book.id}`);
                    console.log("Clicked Details for book id:", book);
                  }}
                  className="border border-green-600 px-2 py-1 rounded bg-green-400"
                >
                  Details
                </button>
              </li>
            ))}
          </ul>
        </div>

        <input
          type="text"
          className="border"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Book Name"
        />
        <input
          type="text"
          className="border"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />

        <button
          onClick={async () => {
            await addBook({
              id: `${Math.floor(Math.random() * 10000)}`,
              name: bookName,
              author: author,
              createdAt: new Date().toISOString(),
              ownerName: "babaZhaba",
            });
            const books = await fetchBooks();
            setBooks(books);
          }}
        >
          Add Book
        </button>
      </Container>
    </ProtectedRoute>
  );
}
