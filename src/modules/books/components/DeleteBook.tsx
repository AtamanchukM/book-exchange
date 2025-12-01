import { deleteBook } from "@/modules/books/services/deleteBook";
export default function DeleteBook({ id }: { id: string }) {
  return (
    <button
      className="bg-red-500 hover:bg-red-700 transition-all py-2 px-4 rounded"
      onClick={() => {
        deleteBook(id)
        console.log(`Book with id ${id} deleted`);
      }}
    >
      Delete Book
    </button>
  );
}
