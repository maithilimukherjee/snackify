import { recipes } from "../data/recipes.js";

const getBuyLinks = (ingredient) => ({
  blinkit: `https://blinkit.com/s/?q=${ingredient}`,
  instamart: `https://www.swiggy.com/instamart/search?query=${ingredient}`
});

export const recommendRecipes = (userIngredients, preference = "both") => {
  // normalize user ingredients
  const normalizedUserIngredients = userIngredients.map(i =>
    i.trim().toLowerCase()
  );

  // step 1 → filter by food preference
  let filteredRecipes = recipes;

  if (preference === "veg") {
    filteredRecipes = recipes.filter(r => r.type === "veg");
  } else if (preference === "non-veg") {
    filteredRecipes = recipes.filter(r => r.type === "non-veg");
  }

  // step 2 → score recipes + compute missing ingredients
  const scored = filteredRecipes.map(recipe => {
    const recipeIngredients = recipe.ingredients.map(i =>
      i.toLowerCase()
    );

    const matchedIngredients = recipeIngredients.filter(ing =>
      normalizedUserIngredients.includes(ing)
    );

    const missingIngredients = recipeIngredients.filter(
      ing => !normalizedUserIngredients.includes(ing)
    );

    return {
      ...recipe,
      score: matchedIngredients.length,
      missingIngredients,
      buySuggestions: missingIngredients.map(ing => ({
        name: ing,
        links: getBuyLinks(ing)
      }))
    };
  });

  // step 3 → remove irrelevant recipes
  let validRecipes;

  if (normalizedUserIngredients.length === 1) {
    validRecipes = scored.filter(r => r.score >= 1);
  } else {
    const MIN_MATCH_RATIO = 0.5;
    validRecipes = scored.filter(
      r => r.score / normalizedUserIngredients.length >= MIN_MATCH_RATIO
    );
  }

  // step 4 → sort by relevance
  validRecipes.sort((a, b) => b.score - a.score);

  // step 5 → return top 3
  return validRecipes.slice(0, 3);
};
