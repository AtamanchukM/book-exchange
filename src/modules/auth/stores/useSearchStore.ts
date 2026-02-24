import { create } from "zustand";
import type { FilterState } from "@/modules/books/utils/searchFilters";

type SearchState = {
  query: string;
  filters: FilterState;
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
};

export { filteredBooks } from "@/modules/books/utils/toLowerCase";

const initialFilters: FilterState = {
  categories: [],
  location: "",
};

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  filters: initialFilters,
  setQuery: (query) => set({ query }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));
