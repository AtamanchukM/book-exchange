import emailjs from "@emailjs/browser"; // user: { email: string, displayName?: string }
// book: { name: string }
// offeredBooks: Array<{ name: string }>
export async function sendBookExchangeEmail({
  user,
  book,
  offeredBooks,
  fromEmail,
  toEmail,
}: {
  user: { email: string; name?: string };
  book: { name: string };
  offeredBooks: Array<{ name: string }>;
  toEmail: string;
}) {
  console.log("sendBookExchangeEmail input:", { user, book, offeredBooks, toEmail });
  const response = await emailjs.send(
    "service_d1i3c48",
    "template_q7xf9lt",
    {
      fromEmail: user.email,
      fromUser: user.name ,
      toEmail,
      time: new Date().toLocaleString(),
      RequestBook: book.name,
      booksForExchange: offeredBooks.map((b) => b.name).join(", "),
    },
    "NnuGcqnH14lVkJRbj"
  );
  console.log("sendBookExchangeEmail response:", response);
  return response;
}
