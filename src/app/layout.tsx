import "@/styles/globals.css";
import Header from "@/modules/auth/components/Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main className="pt-[70px]">{children}</main>
      </body>
    </html>
  );
}
