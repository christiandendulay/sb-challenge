import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { Recipe } from "@/types/recipe";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (req.method === "POST") {
    const { title } = req.body;
    try {
      const filePath = path.join(process.cwd(), "public", "recipes.json");

      const recipesData = fs.readFileSync(filePath, "utf8");
      const recipes = JSON.parse(recipesData);

      const updatedRecipes = recipes.filter(
        (recipe: Recipe) => recipe.title !== title
      );

      fs.writeFileSync(filePath, JSON.stringify(updatedRecipes, null, 2));
      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete recipe" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
