import React from "react";

export default function RecipeModal({ recipe, onClose }) {
    if (!recipe) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} className="mb-4 rounded" />
          <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
          <button onClick={onClose} className="mt-4 text-orange-500 font-bold">Close</button>
        </div>
      </div>
    );
  }
  