'use client';
import Image from "next/image";
import React, {useState} from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/Searchbar";
import RecipeModal from "./components/RecipeModal";


const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {

  const[recipes, setRecipes] = useState([]);
  const[selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async (query: string) => {
    // console.log("Query submitted:", query);
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    setRecipes(data.results || []);
  }
  const handleCardClick= async(id: number) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    const data = await response.json();
    setSelectedRecipe(data);
  }

  return (
    <>
      <Navbar />
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">Welcome to Recipe Finder</h1>
        <p className="mt-4 text-lg">Find your favorite recipes easily!</p>
        <Image
          src="/recipe.jpeg"
          alt="Recipe Image"
          width={500}
          height={300}
          className="rounded-lg mt-6"
        />  
        <SearchBar onSearch={handleSearch} />

        {/* card section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {recipes.map((recipe: any) => (
            <div key={recipe.id} onClick={()=> handleCardClick(recipe.id)} className="border rounded-lg shadow-lg p-4">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={200}
                height={200}
                className="rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="mt-2 text-gray-600">{recipe.summary}</p>
            </div>
          ))}

        </div>
      </div>
      {selectedRecipe && (
      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </>
  );
}
