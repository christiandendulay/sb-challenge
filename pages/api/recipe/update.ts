import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { Recipe } from "@/types/recipe";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (req.method === "POST") {
    const updatedRecipe = req.body;
    try {
      const filePath = path.join(process.cwd(), "public", "recipes.json");

      const recipesData = fs.readFileSync(filePath, "utf8");
      const { recipes } = JSON.parse(recipesData);

      const index = recipes.findIndex((recipe: Recipe) => {
        console.log({ recipe });
        return recipe.title === updatedRecipe.title;
      });
      if (index !== -1) {
        recipes[index] = updatedRecipe;
      } else {
        return res.status(404).json({ message: "Recipe not found" });
      }

      // Write the updated recipes back to the JSON file
      fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));
      res.status(200).json({ message: "Recipe updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update recipe" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
