'use client';
import React,{useState} from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function Searchbar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);  // Trigger search when form is submitted
      }

    return (
        <form onSubmit={handleSubmit} className="flex items-center justify-center mt-4">
            <input className="p-2 text-black rounded-l-md border border-gray-300" type="text" placeholder="Search for recipes..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit" className="bg-orange-500 text-white p-2 rounded-r-md hover:bg-orange-600 transition duration-300">Search</button>
        </form>
    );
}