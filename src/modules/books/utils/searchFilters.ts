import type { BookData } from "../types/book.types";

export type FilterState = {
  categories: string[];
  location: string;
};

export const bookCategories = [
  { value: "fiction", label: "Художня література" },
  { value: "non-fiction", label: "Нехудожня література" },
  { value: "science", label: "Наукова література" },
  { value: "history", label: "Історична література" },
  { value: "children", label: "Дитяча література" },
  { value: "biography", label: "Біографія" },
  { value: "fantasy", label: "Фентезі" },
  { value: "mystery", label: "Детектив" },
  { value: "romance", label: "Роман" },
  { value: "thriller", label: "Трилер" },
  { value: "self-help", label: "Самодопомога" },
];

/**
 * Apply filters to books array
 */
export function applyFilters(
  books: BookData[],
  query: string,
  filters: FilterState,
): BookData[] {
  return books.filter((book) => {
    // Text search (name or author)
    const matchesQuery =
      !query ||
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase());

    // Category filter
    const matchesCategory =
      filters.categories.length === 0 ||
      (book.category && filters.categories.includes(book.category));

    // Location filter
    const matchesLocation =
      !filters.location ||
      book.ownerLocation.toLowerCase().includes(filters.location.toLowerCase());

    return matchesQuery && matchesCategory && matchesLocation;
  });
}

/**
 * Get unique locations from books
 */
export function getUniqueLocations(books: BookData[]): string[] {
  const locations = new Set<string>();
  books.forEach((book) => {
    if (book.ownerLocation) {
      locations.add(book.ownerLocation);
    }
  });
  return Array.from(locations).sort();
}
