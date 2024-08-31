import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Recipe } from "@/types/recipe";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const filePath = path.join(process.cwd(), "public", "recipes.json");
      const fileData = fs.readFileSync(filePath, "utf-8");
      let existingData = JSON.parse(fileData);

      const newRecipe = req.body;
      console.log({ existingData });
      if (existingData.some((data: Recipe) => data.title === req.body.title)) {
        res.status(500).json({ message: "Title already exist" });
      } else {
        existingData.push(newRecipe);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        res.status(200).json(existingData);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to save recipe" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
