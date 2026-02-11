import Image from "next/image";
import Link from "next/link";
import placeholder from "../images/placeholder.png";
import { BookData } from "../types/book.types";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useState, ReactNode } from "react";
import { SlLocationPin } from "react-icons/sl";
import truncateText from "../utils/truncateText";
import { motion } from "motion/react";
export default function BookItem({
  book,
  renderedActions,
}: {
  book: BookData;
  renderedActions?: ReactNode;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col w-full h-full overflow-hidden bg-white shadow-lg rounded-2xl "
    >
      <Link href={`/books/${book.id}`} className="flex flex-col grow">
        <div className="relative w-full overflow-hidden bg-gray-300 aspect-2/3">
          <Image
            src={book.photoUrl || placeholder}
            alt={book.name}
            width={250}
            height={350}
            className="object-cover w-full h-full hover:scale-[1.05] transition-transform duration-300 "
          />
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

        <div className="flex flex-col gap-2 p-4 grow">
          <div className="flex flex-col gap-2 pb-2 border-b border-gray-200 ">
            <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
              {book.name}
            </h2>

            <p className="text-sm text-gray-600 truncate">
              {truncateText(book.author || "", 25)}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 text-xs text-gray-500 truncate">
            <span className="flex items-center gap-2">
              <SlLocationPin size={14} className="shrink-0" />
              {truncateText(book.city || "Місто", 15)}
            </span>
            <span className="truncate">
              @{truncateText(book.ownerName || "user", 15)}
            </span>
          </div>
        </div>
      </Link>
      {renderedActions && (
        <div className="flex justify-center w-full">{renderedActions}</div>
      )}
    </motion.div>
  );
}
