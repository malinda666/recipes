import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { category } = req.query;

    if (!category) {
      res.status(404).json({
        message: "Category not found",
      });
    } else {
      try {
        const { data } = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        res.status(200).json([...data.meals]);
      } catch (error) {
        console.error("Failed to get recipes", error);
        res.status(400).json({
          message: "Failed to get recipes",
          error,
        });
      }
    }
  } else {
    res.status(405).end();
  }
}
