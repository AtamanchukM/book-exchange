import { useBooks } from "@/hooks/useBooks";
import { deleteBook } from "@/services/deleteBook";
export default function DeleteBook(id: any) {
  const { books } = useBooks();
  const book = books.find((b) => b.id === id.id)!;
  if (!book) {
    return <div>Loading...</div>;
  }
  function handleDelete() {
    deleteBook(book.id);
  }

  return (
    <button className="bg-red-400 hover:bg-red-600 transition-all cursor-pointer py-2 px-4 rounded" onClick={() => handleDelete()}>
      Delete Book
    </button>
  );
}
