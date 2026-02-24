"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchStore } from "@/modules/auth/stores/useSearchStore";
import {
  bookCategories,
  getUniqueLocations,
} from "@/modules/books/utils/searchFilters";
import type { BookData } from "@/modules/books/types/book.types";

type FilterDropdownProps = {
  books: BookData[];
};

export default function FilterDropdown({ books }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filters = useSearchStore((s) => s.filters);
  const setFilters = useSearchStore((s) => s.setFilters);
  const resetFilters = useSearchStore((s) => s.resetFilters);

  const locations = getUniqueLocations(books);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    setFilters({ categories: newCategories });
  };

  const handleLocationChange = (location: string) => {
    setFilters({ location });
  };

  const activeFilterCount =
    filters.categories.length + (filters.location ? 1 : 0);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 space-x-2 transition-colors bg-white border rounded-lg shadow-sm border-stone-200 text-stone-600 hover:bg-stone-50 relative"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <span>Фільтри</span>
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-amber-500 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-80 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[500px] overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Фільтри</h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    resetFilters();
                  }}
                  className="text-sm text-amber-600 hover:text-amber-700"
                >
                  Скинути все
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-gray-200">
            <h4 className="mb-3 text-sm font-medium text-gray-700">
              Категорії
            </h4>
            <div className="space-y-2">
              {bookCategories.map((category) => (
                <label
                  key={category.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.value)}
                    onChange={() => handleCategoryToggle(category.value)}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">
                    {category.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="p-4">
            <h4 className="mb-3 text-sm font-medium text-gray-700">Місто</h4>
            <select
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">Усі міста</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Apply button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-amber-600 rounded-lg hover:bg-amber-700"
            >
              Застосувати
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
