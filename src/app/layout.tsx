import "@/styles/globals.css";
import Header from "@/modules/common/Header";
import Footer from "@/modules/common/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />

        <main className="pt-[70px] flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
