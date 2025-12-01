import Link from "next/link";

export default function Details({ id }: { id: string }) {
  return (
    <div>
      <Link
        href={`/books/${id}`}
        className="py-2 px-4 bg-green-400 hover:bg-green-600 transition-all flex justify-center items-center rounded"
      >
        Detail
      </Link>
    </div>
  );
}
