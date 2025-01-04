"use client";

import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setResult("Error fetching recipes. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center font-bold text-4xl my-6">
        🍽️ Fridge to Plate 🍽️
      </h1>
      <form className="mt-4" onSubmit={fetchRecipes}>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Cooking..." : "Go"}
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-lg font-bold">Recipes:</h2>
          <p>{result}</p>
        </div>
      )}
    </main>
  );
}