"use client";
import ProtectedAdmin from "@/route/ProtectedAdmin";
import BookList from "@/components/books/BookList";
import Container from "@/components/common/Container";
import { useBooks } from "@/hooks/useBooks";
import Details from "@/components/books/Details";
import DeleteBook from "@/components/books/DeleteBook";
import { useSearchStore, filteredBooks } from "@/stores/useSearchStore";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "@/services/users/fetchAllUsers";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const { Allbooks, loading, hasMore, loadMore } = useBooks();
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
        <h1 className="text-white text-3xl">Admin Panel</h1>
        <span className="text-white text-2xl">
          Users: {users.map((user) => user.name).join(", ")}
        </span>
        <BookList
          loading={loading}
          hasMore={hasMore}
          loadMore={loadMore}
          books={filteredBooks(Allbooks, query)}
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
