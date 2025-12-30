import fs from "fs";
import path from "path";
import { recipes } from "../data/recipes.js";


const RECIPES_FILE = path.join(process.cwd(), "src", "data", "recipes.js");

export const submitIdea = (req, res) => {

  console.log("submitIdea called");
  try {
    const { name, ingredients, type, healthy } = req.body;

    if (!name || !ingredients || !type) {
      return res.status(400).json({ message: "name, ingredients, and type are required" });
    }

    // create new recipe object
    const newRecipe = { name, ingredients, type, healthy };

    // add to in-memory array
    recipes.push(newRecipe);

    // persist back to recipes.js file
    const fileContent = `export const recipes = ${JSON.stringify(recipes, null, 2)};`;
    fs.writeFileSync(RECIPES_FILE, fileContent, "utf-8");

    res.status(201).json({ message: "recipe idea added successfully" });
  } catch (error) {
    console.error("submitIdea error:", error);
    res.status(500).json({ message: "server error" });
  }
};
