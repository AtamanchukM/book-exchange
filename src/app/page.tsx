"use client";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import mainBooks from "./assets/mainBooks.jpg";
import BookList from "@/modules/books/components/BookList";
import { useBooks } from "@/modules/books/hooks/useBooks";
import Details from "@/modules/books/components/Details";
import {
  useSearchStore,
  filteredBooks,
} from "@/modules/auth/stores/useSearchStore";

export default function Home() {
  const { books, loading, hasMore, loadMore } = useBooks();
  const query = useSearchStore((s) => s.query);
  return (
    <section className="">
      <div className="flex lg:flex-row flex-col min-h-[70vh] bg-amber-50 mb-12 ">
        <div className="flex flex-col justify-center flex-1 gap-6 px-4 py-16 text-center md:px-20 lg:text-left">
          <div className="">
            <h1 className="text-4xl font-bold sm:text-5xl ,md:text-6xl text-stone-900">
              Обмінюйтесь книгами{" "}
              <span className="text-amber-600">діліться історіям</span>
            </h1>
          </div>
          <div className="text-stone-500">
            Знайдіть нові улюблені книги, віддайте ті, що вже прочитали.
            Приєднуйтесь до нашої спільноти книголюбів і дайте книгам друге
            життя.
          </div>
          <div className="flex flex-col justify-center gap-3 md:flex-row lg:justify-start">
            <button className="flex items-center justify-center gap-4 px-4 text-lg text-white rounded-lg h-15 bg-amber-600">
              знайти книгу <FiArrowRight />
            </button>
            <button className="flex items-center justify-center px-4 text-lg rounded-lg h-15 bg-amber-100 text-amber-700">
              як це працює?
            </button>
          </div>
        </div>
        <div className="relative flex items-center flex-1">
          <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-r from-amber-100/80 to-transparent"></div>
          <Image
            src={mainBooks}
            alt="Description of image"
            width={500}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <BookList
        books={filteredBooks(books, query)}
        loading={loading}
        hasMore={hasMore}
        loadMore={loadMore}
      />
    </section>
  );
}
