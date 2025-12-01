import { sendBookExchangeEmail, useBookExchange } from "@/modules/books";
import { createExchangeRequest } from "@/modules/books";

interface ExchangeButtonProps {
  book: { name: string };
}

export default function ExchangeButton({ book }: ExchangeButtonProps) {
  const { user, userBooks, toEmail } = useBookExchange(book);
  const handleExchange = async () => {
    if (user && book && user.uid === book.ownerId) {
      alert("Ви не можете надсилати запит на обмін на власну книгу.");
      return;
    }
    try {
      await sendBookExchangeEmail({
        user,
        book,
        toEmail,
        offeredBooks: userBooks,
      });
      // Додаємо запит у Firestore для власника книги
      if (user && book && toEmail) {
        await createExchangeRequest({
          userId: book.ownerId,
          message: `Користувач ${user.name || user.email} хоче обміняти книгу "${book.name}". Його книги для обміну: ${userBooks.map(b => b.name).join(", ")}`,
        });
      }
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
