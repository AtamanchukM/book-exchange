// "use client";
// import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
// import BookList from "@/modules/books/components/BookList";
// import Container from "@/modules/common/Container";
// import { useUserBooks } from "@/modules/books/hooks/useUserBooks";
// import Details from "@/modules/books/components/Details";
// import DeleteBook from "@/modules/books/components/DeleteBook";
// import {
//   useSearchStore,
//   filteredBooks,
// } from "@/modules/auth/stores/useSearchStore";
// import AddBookForm from "@/modules/books/components/AddBookForm";

// export default function Mybooks() {
//   const user = useAuthStore((state) => state.user);
//   const query = useSearchStore((s) => s.query);

//   const { books, loadMore, hasMore } = useUserBooks(user?.uid);

//   return (
//     <Container>
//       <h1 className="mb-4 text-3xl text-white">My Books</h1>
//       <BookList
//         books={filteredBooks(books, query)}
//         loadMore={loadMore}
//         hasMore={hasMore}
//         renderActions={(book) => <DeleteBook id={book.id} />}
//       />
//       <AddBookForm />
//     </Container>
//   );
// }
