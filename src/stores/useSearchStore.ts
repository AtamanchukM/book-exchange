import { create } from "zustand";

type SearchState = {
  query: string;
  setQuery: (query: string) => void;
};

export const filteredBooks = (books: any[], query: string) => {
  return books.filter(
    (book) =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );
};

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query: query }),
}));
