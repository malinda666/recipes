import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      res.status(200).json([...data.categories]);
    } catch (error) {
      console.error("Failed to get categories", error);
      res.status(400).json({
        message: "Failed to get categories",
        error,
      });
    }
  } else {
    res.status(405).end();
  }
}
