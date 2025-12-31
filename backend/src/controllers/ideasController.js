import fs from "fs";
import path from "path";
import { recipes } from "../data/recipes.js";
import { ingredients as ingredientList } from "../data/ingredients.js";

const RECIPES_FILE = path.join(process.cwd(), "src", "data", "recipes.js");
const INGREDIENTS_FILE = path.join(process.cwd(), "src", "data", "ingredients.js");

export const submitIdea = (req, res) => {
  console.log("submitIdea called");

  try {
    const { name, ingredients, type, healthy, directions, recipeLink } = req.body;

    if (!name || !ingredients || !type) {
      return res
        .status(400)
        .json({ message: "name, ingredients, and type are required" });
    }

    const normalizedIngredients = Array.isArray(ingredients)
      ? ingredients.map(i => i.trim().toLowerCase())
      : ingredients.split(",").map(i => i.trim().toLowerCase());

    const newIngredients = normalizedIngredients.filter(
      ing => !ingredientList.includes(ing)
    );

    if (newIngredients.length > 0) {
      ingredientList.push(...newIngredients);

      fs.writeFileSync(
        INGREDIENTS_FILE,
        `export const ingredients = ${JSON.stringify(
          ingredientList,
          null,
          2
        )};`,
        "utf-8"
      );
    }

    const newRecipe = {
      name,
      ingredients: normalizedIngredients,
      type,
      healthy: Boolean(healthy),
      directions: directions || "",
      recipeLink: recipeLink || "",
    };

    recipes.push(newRecipe);

    fs.writeFileSync(
      RECIPES_FILE,
      `export const recipes = ${JSON.stringify(recipes, null, 2)};`,
      "utf-8"
    );

    res.status(201).json({
      message: "recipe idea added successfully",
      addedIngredients: newIngredients,
    });
  } catch (error) {
    console.error("submitIdea error:", error);
    res.status(500).json({ message: "server error" });
  }
};
