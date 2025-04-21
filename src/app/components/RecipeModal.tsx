'use client';
import React, { useEffect } from "react";

interface RecipeModalProps {
  recipe: {
    title: string;
    image: string;
    summary: string;
  };
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  if (!recipe) return null;

  // Close modal with Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = 'hidden'; // Prevent scroll when modal is open

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = 'auto'; // Re-enable scroll on close
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} className="mb-4 rounded-lg w-full h-auto" />
        <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        <button
          onClick={onClose}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
