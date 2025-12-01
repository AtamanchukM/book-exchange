import Image from "next/image";
import placeholder from "../images/placeholder.png";
import { BookData } from "../types/book.types";
export default function BookItem({
  book,
  renderActions,
}: {
  book: BookData;
  renderActions?: (book: BookData) => React.ReactNode;
}) {
  return (
    <li className="flex flex-col sm:flex-row w-full h-full gap-4 p-4 rounded-xl bg-blue-900/10 shadow-lg shadow-blue-900/20 transition-transform hover:scale-[1.02]">
      <div className=" flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden w-[120px] h-[170px] sm:w-[140px] sm:h-[200px]">
        <Image
          src={book.photoUrl || placeholder}
          alt={book.name}
          width={120}
          height={170}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between ">
        <div className="flex flex-col gap-2 mb-2">
          <h2 className="text-xl font-bold text-white leading-tight truncate">
            {book.name}
          </h2>
          <p className="text-gray-300 text-sm">
            Автор: <span className="font-medium text-white">{book.author}</span>
          </p>
          <p className="text-gray-400 text-xs">
            Власник: <span className="text-white">{book.ownerName}</span>
          </p>
        </div>
        <div className="mt-2">{renderActions && renderActions(book)}</div>
      </div>
    </li>
  );
}
