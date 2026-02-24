"use client";
import ProtectedAdmin from "@/modules/auth/middleware/ProtectedAdmin";
import BookList from "@/modules/books/components/BookList";
import Container from "@/modules/common/Container";
import { useBooks } from "@/modules/books/hooks/useBooks";
import Details from "@/modules/books/components/Details";
import DeleteBook from "@/modules/books/components/DeleteBook";
import {
  useSearchStore,
  filteredBooks,
} from "@/modules/auth/stores/useSearchStore";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "@/modules/profile/services/fetchAllUsers";
import { DocumentData } from "firebase/firestore";

export default function AdminPanel() {
  const [users, setUsers] = useState<DocumentData[]>([]);
  const { books, loading, hasMore, loadMore } = useBooks();
  const query = useSearchStore((s) => s.query);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchAllUsers();
      setUsers(users);
    };
    getUsers();
  }, [users]);
  return (
    <ProtectedAdmin>
      <Container>
        <span className="text-2xl">
          Users: {users.map((user) => user.name).join(", ")}
        </span>
        <BookList
          loading={loading}
          hasMore={hasMore}
          loadMore={loadMore}
          books={filteredBooks(books, query)}
          renderActions={(book) => <DeleteBook id={book.id} />}
        />
      </Container>
    </ProtectedAdmin>
  );
}
