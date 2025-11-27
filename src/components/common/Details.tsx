import Link from "next/link";
import { useBooks } from "@/hooks/useBooks";
export default function Details(id: any) {
  const { books } = useBooks();
  const book = books.find((b) => b.id === id.id)!;
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link
        href={`/books/${book.id}`}
        className=" py-2 px-4 bg-green-400 hover:bg-green-600 transition-all flex justify-center items-center rounded "
      >
        Detail
      </Link>
    </div>
  );
}
