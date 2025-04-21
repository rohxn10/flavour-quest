'use client';
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/Searchbar";
import RecipeModal from "./components/RecipeModal";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const heroImages = [
  "/recipe.jpg",
  "/recipe2.jpg",
  "/recipe3.jpeg",
];

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideshowRef = useRef(null);

  // Slideshow interval logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Preload images
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const handleDotClick = (idx) => setCurrentImage(idx);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.results || []);
  };

  const handleCardClick = async (id) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const data = await response.json();
    setSelectedRecipe(data);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section with Slideshow */}
      <section className="relative bg-black text-white flex flex-col md:flex-row items-center justify-center min-h-[80vh] px-6 py-20 gap-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-0 rounded-2xl" />
        <div className="relative z-10 md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to <span className="text-orange-500">Recipe Finder</span>
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Discover your next favorite dish in seconds.
          </p>
          <div className="mt-6 flex justify-center md:justify-start">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        {/* Slideshow */}
        <div
          className="relative z-10 md:w-1/2 w-full h-[250px] md:h-[400px] overflow-hidden rounded-2xl shadow-xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={slideshowRef}
        >
          {heroImages.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`Slideshow image ${idx + 1}`}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000
                ${idx === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}
              `}
              priority={idx === 0}
            />
          ))}
          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`w-3 h-3 rounded-full border-2 border-white bg-white transition
                  ${idx === currentImage ? 'opacity-100' : 'opacity-40'}
                `}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="bg-white px-6 md:px-12 py-14">
        {recipes.length > 0 && (
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : 'Popular Recipes'}
          </h2>
        )}
        {recipes.length === 0 && searchQuery && (
          <p className="text-center text-gray-500 text-lg">
            No recipes found for "{searchQuery}". Try something else!
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
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
