"use client";
import { useAuthStore } from "@/modules/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchStore } from "@/modules/auth/stores/useSearchStore";
import ProtectedRoute from "../middlware/ProtectedRoute";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { IoBookOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMenuOpen]);

  return (
    <ProtectedRoute>
      <header
        ref={headerRef}
        className="fixed w-full shadow-md h-[70px]  z-50  bg-amber-50"
      >
        {/* Desktop */}
        <nav className="items-center justify-between hidden w-full gap-8 px-4 py-4 mx-auto md:flex max-w-7xl">
          <div className="flex items-center flex-1 w-full gap-8">
            <div className="flex items-center gap-2 text-2xl text-stone-900">
              <IoBookOutline size={28} className="text-amber-700" />
              BookSwap
            </div>
            <input
              type="text"
              placeholder="Пошук книг, авторів..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full max-w-xl p-2 px-4 transition bg-white border-2 rounded-full shadow-md text-md text-stone-900 border-amber-50 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-8">
            <Link
              href="/books"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                isActive("/books")
                  ? "bg-amber-100 text-amber-600 "
                  : "text-stone-900 hover:bg-amber-100"
              }`}
            >
              <LiaSwatchbookSolid size={20} />
              Всі книги
            </Link>
            <Link
              href="/me/books"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                isActive("/me/books")
                  ? "bg-amber-100 text-amber-600 "
                  : "text-stone-900 hover:bg-amber-100"
              }`}
            >
              <IoBookOutline size={20} />
              Мої книги
            </Link>
            <Link
              href="/profile"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                isActive("/profile")
                  ? "bg-amber-100 text-amber-600 "
                  : "text-stone-900 hover:bg-amber-100"
              }`}
            >
              <CiUser size={20} />
              Профіль
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/adminPanel"
                className="px-4 py-1 ml-2 font-semibold text-blue-300 transition border border-blue-400 rounded hover:bg-blue-800"
              >
                Адмін-панель
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center justify-between h-full px-4 py-4 md:hidden">
          <div className="flex items-center gap-2 text-xl text-stone-900">
            <IoBookOutline size={24} className="text-amber-700" />
            BookSwap
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-stone-900"
          >
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden  w-full bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 space-y-4">
            <input
              type="text"
              placeholder="Пошук..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 px-4 text-sm bg-gray-100 rounded-lg text-stone-900"
            />

            <Link
              href="/books"
              className={`flex items-center gap-3 py-2 transition ${
                isActive("/books")
                  ? "text-amber-700 font-semibold bg-amber-100 pl-3 rounded"
                  : "text-stone-900"
              }`}
              onClick={closeMenu}
            >
              <LiaSwatchbookSolid size={20} />
              Всі книги
            </Link>

            <Link
              href="/me/books"
              className={`flex items-center gap-3 py-2 transition ${
                isActive("/me/books")
                  ? "text-amber-700 font-semibold bg-amber-100 pl-3 rounded"
                  : "text-stone-900"
              }`}
              onClick={closeMenu}
            >
              <IoBookOutline size={20} />
              Мої книги
            </Link>

            <Link
              href="/profile"
              className={`flex items-center gap-3 py-2 transition ${
                isActive("/profile")
                  ? "text-amber-700 font-semibold bg-amber-100 pl-3 rounded"
                  : "text-stone-900"
              }`}
              onClick={closeMenu}
            >
              <CiUser size={20} />
              Профіль
            </Link>

            {user?.role === "admin" && (
              <Link
                href="/adminPanel"
                className="flex items-center gap-3 py-2 font-semibold text-blue-600"
                onClick={closeMenu}
              >
                Адмін-панель
              </Link>
            )}
          </div>
        </div>
      </header>
    </ProtectedRoute>
  );
}
