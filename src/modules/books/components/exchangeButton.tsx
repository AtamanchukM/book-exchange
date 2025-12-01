import { sendBookExchangeEmail } from "@/modules/books/services/bookExchange";
import { useBookExchange } from "@/modules/books/hooks/useBookExchange";

interface ExchangeButtonProps {
  book: { name: string };
}

export default function ExchangeButton({ book }: ExchangeButtonProps) {
  const { user, userBooks, toEmail } = useBookExchange(book);
  const handleExchange = async () => {
    try {
      await sendBookExchangeEmail({
        user,
        book,
        toEmail,
        offeredBooks: userBooks,
      });
      alert("Запит на обмін відправлено!");
    } catch {
      alert("Сталася помилка при відправці запиту на обмін");
    }
  };
  return (
    <button
      onClick={handleExchange}
      className="bg-blue-400 hover:bg-blue-600 py-2 px-4 rounded"
    >
      Exchange
    </button>
  );
}
