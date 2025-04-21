'use client';
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function Searchbar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return; // Avoid empty searches
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto flex items-center justify-center gap-2 mt-6"
    >
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-l-lg text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-lg text-sm sm:text-base transition font-medium"
      >
        Search
      </button>
    </form>
  );
}
