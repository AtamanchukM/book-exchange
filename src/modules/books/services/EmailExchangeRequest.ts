import emailjs from "@emailjs/browser";

export async function sendBookExchangeEmail({
  user,
  book,
  offeredBooks,
  toEmail,
}: {
  user: { email: string; name?: string };
  book: { name: string };
  offeredBooks: Array<{ name: string }>;
  toEmail: string;
}) {
  console.log("sendBookExchangeEmail input:", {
    user,
    book,
    offeredBooks,
    toEmail,
  });
  const response = await emailjs.send(
    process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!,
    {
      fromEmail: user.email,
      fromUser: user.name,
      toEmail,
      time: new Date().toLocaleString(),
      RequestBook: book.name,
      booksForExchange: offeredBooks.map((b) => b.name).join(", "),
    },
    process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY!,
  );
  console.log("sendBookExchangeEmail response:", response);
  return response;
}
