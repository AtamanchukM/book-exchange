/**
 * Фільтрує книги за назвою або автором (регістр незалежний)
 */
export function filteredBooks(books: any[], query: string) {
  return books.filter(
    (book) =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );
}
