'use client';
import Image from "next/image";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/Searchbar";
import RecipeModal from "./components/RecipeModal";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async (query: string) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.results || []);
  };

  const handleCardClick = async (id: number) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const data = await response.json();
    setSelectedRecipe(data);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-black text-white px-6 md:px-12 py-20 min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to <span className="text-orange-500">Recipe Finder</span>
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Discover your next favorite dish in seconds.
          </p>
          <div className="mt-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="md:w-1/2">
          <Image
            src="/recipe.jpeg"
            alt="Delicious food"
            width={600}
            height={400}
            className="rounded-2xl shadow-xl object-cover"
          />
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="bg-white px-6 md:px-12 py-14">
        {recipes.length > 0 && (
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
            Popular Recipes
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe: any) => (
            <div
              key={recipe.id}
              onClick={() => handleCardClick(recipe.id)}
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02]"
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {recipe.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  );
}
