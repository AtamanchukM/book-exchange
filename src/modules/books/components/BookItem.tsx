import Image from "next/image";
import Link from "next/link";
import placeholder from "../images/placeholder.png";
import { BookData } from "../types/book.types";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useState } from "react";

export default function BookItem({ book }: { book: BookData }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden transition-transform bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1 ">
      <Link href={`/books/${book.id}`} className="flex flex-col grow">
        {/* Обкладинка */}
        <div className="relative w-full overflow-hidden bg-gray-300">
          <Image
            src={book.photoUrl || placeholder}
            alt={book.name}
            width={250}
            height={350}
            className="object-cover w-full h-full hover:scale-[1.05] transition-transform duration-300"
          />
          {/* Серце */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute p-2 transition bg-white rounded-full shadow-md top-3 right-3 hover:bg-gray-100"
          >
            {isFavorite ? (
              <MdFavorite size={24} className="text-red-500" />
            ) : (
              <MdFavoriteBorder size={24} className="text-gray-400" />
            )}
          </button>
          <span className="absolute px-3 py-1 text-xs font-semibold text-gray-900 bg-white rounded-full bottom-2 left-2">
            {book.category || "Книга"}
          </span>
        </div>

        {/* Информація */}
        <div className="flex flex-col gap-3 p-4">
          {/* Категорія */}

          {/* Назва */}
          <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
            {book.name}
          </h2>

          {/* Автор */}
          <p className="text-sm text-gray-600">{book.author}</p>

          {/* Місто та користувач */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>📍 {book.city || "Місто"}</span>
            <span>@{book.ownerName || "user"}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
