"use client";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchStore } from "@/modules/auth/stores/useSearchStore";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const route = useRouter();
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);

  return (
    <header className="w-full bg-amber-200 p-4">
      <nav className="max-w-7xl mx-auto flex justify-end items-center gap-4">
        {user && (
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="search book"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 rounded border  focus:outline-none"
              />
            </div>
            <span className="mr-4">
              Привіт, {user?.name} {user?.role}
            </span>
            <Link href="/books">All books</Link>
            <Link href="/me/books">My books</Link>
            <Link href="/profile">Profile</Link>
          </div>
        )}
        <button
          onClick={() => {
            logout();
            route.push("/auth/login");
          }}
        >
          Вийти
        </button>
        {user?.role === "admin" && <Link href="/adminPanel">Admin Panel</Link>}
      </nav>
    </header>
  );
}
