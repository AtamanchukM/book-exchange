import { deleteBook } from "@/services/deleteBook";
export default function DeleteBook({ id, onDelete }: { id: string, onDelete: (id: string) => void }) {

  const handleDelete = async () => {
    await deleteBook(id);
    if (onDelete) onDelete(id);
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 transition-all text-white px-4 py-2 rounded">Delete Book</button>
  );
}
