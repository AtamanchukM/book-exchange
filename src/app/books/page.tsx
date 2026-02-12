// "use client";
// import ProtectedRoute from "@/modules/auth/middlware/ProtectedRoute";
// import Container from "@/modules/common/Container";
// import BookList from "@/modules/books/components/BookList";
// import { useBooks } from "@/modules/books/hooks/useBooks";
// import Details from "@/modules/books/components/Details";
// import {
//   useSearchStore,
//   filteredBooks,
// } from "@/modules/auth/stores/useSearchStore";

// export default function Books() {
//   const { Allbooks, loading, hasMore, loadMore } = useBooks();
//   const query = useSearchStore((s) => s.query);

//   return (
//     <ProtectedRoute>
//       <BookList
//         books={filteredBooks(Allbooks, query)}
//         loading={loading}
//         hasMore={hasMore}
//         loadMore={loadMore}
//       />
//     </ProtectedRoute>
//   );
// }
