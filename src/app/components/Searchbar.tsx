'use client';
import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi"; // Install react-icons if not already

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function Searchbar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query);
  };

  const handleClear = () => setQuery("");

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto flex items-center bg-white rounded-full shadow-md px-3 py-2 gap-2"
    >
      {/* Search Icon */}
      <span className="text-gray-400 text-xl">
        <FiSearch />
      </span>
      {/* Input */}
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none text-gray-800 text-base px-2"
      />
      {/* Clear Button */}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="text-gray-400 hover:text-gray-600 text-xl focus:outline-none"
          aria-label="Clear search"
        >
          <FiX />
        </button>
      )}
      {/* Submit Button */}
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full transition font-semibold ml-2"
      >
        Search
      </button>
    </form>
  );
}
