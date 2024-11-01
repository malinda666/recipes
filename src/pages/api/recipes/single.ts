import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      res.status(404).json({
        message: "Recipe id not found",
      });
    } else {
      try {
        const { data } = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        res.status(200).json([...data.meals]);
      } catch (error) {
        console.error("Failed to get recipe", error);
        res.status(400).json({
          message: "Failed to get recipe",
          error,
        });
      }
    }
  } else {
    res.status(405).end();
  }
}
