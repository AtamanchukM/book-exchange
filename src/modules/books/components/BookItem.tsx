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
    <li className="text-white border  border-gray-600 flex  gap-4 p-4 rounded  text-left w-fit">
      <Image
        src={book.photoUrl || placeholder}
        alt={book.name}
        width={200}
        height={300}
        className="object-cover"
      />
      <div className="flex flex-col justify-between ">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{book.name}</h2>
          <p className="text-gray-300">Автор: {book.author}</p>
          <p>Власник: {book.ownerName}</p>
        </div>
        {renderActions && renderActions(book)}{" "}
      </div>
    </li>
  );
}
