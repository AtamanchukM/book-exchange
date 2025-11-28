"use client";
import ProtectedAdmin from "@/route/ProtectedAdmin";
import BookList from "@/components/books/BookList";
import Container from "@/components/common/Container";
import { useBooks } from "@/hooks/useBooks";
import Details from "@/components/common/Details";
import DeleteBook from "@/components/common/DeleteBook";
import { useSearchStore } from "@/stores/useSearchStore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const { books } = useBooks();
  const query = useSearchStore((s) => s.query);
  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );

  const fetchAllUsers = async () => {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    return userSnapshot.docs.map((doc) => doc.data());
  };
  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchAllUsers();
      setUsers(users);
    };
    getUsers();
  }, []);
  return (
    <ProtectedAdmin>
      <Container>
        <h1 className="text-white text-3xl">Admin Panel</h1>
        <span className="text-white text-2xl">
          Users: {users.map((user) => user.name).join(", ")}
        </span>
        <BookList
          books={filteredBooks}
          renderActions={(book) => (
            <div className="flex flex-col justify-center gap-2">
              <DeleteBook id={book.id} />
              <Details id={book.id} />
            </div>
          )}
        />
      </Container>
    </ProtectedAdmin>
  );
}
