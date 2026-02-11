import { deleteBook } from "@/modules/books/services/deleteBook";
export default function DeleteBook({ id }: { id: string }) {
  return (
    <button
      className="w-full px-4 py-2 text-white transition-colors duration-300 rounded bg-amber-400 hover:bg-amber-500"
      onClick={() => {
        deleteBook(id);
        console.log(`Book with id ${id} deleted`);
      }}
    >
      Delete Book
    </button>
  );
}
