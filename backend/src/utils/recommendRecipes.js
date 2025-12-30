import { recipes } from "../data/recipes.js";

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

  // step 2 → score recipes
  const scored = filteredRecipes.map(recipe => {
    const recipeIngredients = recipe.ingredients.map(i =>
      i.toLowerCase()
    );

    const score = recipeIngredients.filter(ing =>
      normalizedUserIngredients.includes(ing)
    ).length;

    return { ...recipe, score };
  });

  // step 3 → remove useless recipes
  let validRecipes;

  if (normalizedUserIngredients.length === 1) {
    // single ingredient → allow broad matches
    validRecipes = scored.filter(r => r.score >= 1);
  } else {
    // multiple ingredients → stricter matching
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