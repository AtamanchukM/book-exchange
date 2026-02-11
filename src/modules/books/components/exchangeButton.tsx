import { sendBookExchangeEmail, useBookExchange } from "@/modules/books";
import { createExchangeRequest } from "@/modules/books";

interface ExchangeButtonProps {
  book: { id: string; name: string; ownerId: string };
}

export default function ExchangeButton({ book }: ExchangeButtonProps) {
  const { user, userBooks, toEmail } = useBookExchange(book);
  console.log("ExchangeButton props:", { book, user, userBooks, toEmail });
  const handleExchange = async () => {
    if (user && book && user.uid === book.ownerId) {
      alert("Ви не можете надсилати запит на обмін на власну книгу.");
      return;
    }
    if (!user) {
      alert("Будь ласка, увійдіть в акаунт");
      return;
    }
    try {
      await sendBookExchangeEmail({
        user,
        book,
        toEmail,
        offeredBooks: userBooks,
      });
      if (user && book && toEmail) {
        await createExchangeRequest({
          userId: book.ownerId,
          senderId: user.uid,
          senderName: user.name || "Невідомий користувач",
          senderEmail: user.email,
          bookId: book.id,
          bookName: book.name,
          offeredBooks: userBooks.map((b) => b.name).join(", "),
          message: `Користувач ${user.name || user.email} хоче обміняти книгу "${book.name}". Його книги для обміну: ${userBooks.map((b) => b.name).join(", ")}`,
        });
      }
      alert("Запит на обмін відправлено!");
    } catch (error) {
      console.error("Exchange error:", error);
      alert("Сталася помилка при відправці запиту на обмін");
    }
  };
  return (
    <button
      onClick={handleExchange}
      className="w-full px-4 py-2 text-white transition-colors duration-300 rounded bg-amber-400 hover:bg-amber-500"
    >
      Exchange
    </button>
  );
}
