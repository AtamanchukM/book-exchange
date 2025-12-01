"use client";
import { useAuthStore } from "@/modules/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchStore } from "@/modules/auth/stores/useSearchStore";
import Image from "next/image";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const route = useRouter();
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);

  return (
    <header className="w-full bg-gray-900 p-4 sticky top-0 z-30 shadow-md">
      <nav className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          {user && (
            <>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Пошук книги..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="p-2 rounded-lg border border-blue-400 bg-gray-800 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition placeholder:text-gray-400 w-full sm:w-72"
                />
               
              </div>
              <div className="hidden sm:block h-8 border-l border-blue-400 mx-6"></div>
              <div className="flex gap-4 items-center mt-2 sm:mt-0">
                <Link href="/books" className="px-4 py-1 rounded hover:bg-blue-900 transition text-blue-100 font-medium">Всі книги</Link>
                <Link href="/me/books" className="px-4 py-1 rounded hover:bg-blue-900 transition text-blue-100 font-medium">Мої книги</Link>
                <Link href="/profile" className="px-4 py-1 rounded hover:bg-blue-900 transition text-blue-100 font-medium">Профіль</Link>
                {user?.role === "admin" && (
                  <Link href="/adminPanel" className="px-4 py-1 rounded hover:bg-blue-800 transition text-blue-300 font-semibold border border-blue-400 ml-2">Адмін-панель</Link>
                )}
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => {
            logout();
            route.push("/auth/login");
          }}
          className="px-5 py-2 rounded-lg bg-blue-600 text-blue-100 font-semibold hover:bg-blue-700 transition shadow border border-blue-400 mt-4 sm:mt-0"
        >
          Вийти
        </button>
         <div className="flex items-center gap-3 pl-2">
                  <span className="font-semibold text-blue-100 whitespace-nowrap">{user?.name}</span>
                  <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                    <Image
                      src={user?.avatar || "/default-avatar.png"}
                      alt="User Avatar"
                      width={48}
                      height={48}
                      className="rounded-full object-cover w-12 h-12"
                      priority
                    />
                  </div>
                </div>
      </nav>
    </header>
  );
}
