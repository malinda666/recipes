import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { id: String(id) },
        select: { favouriteRecipes: true },
      });

      if (user) {
        res.status(200).json(user.favouriteRecipes);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting favourite recipes", error });
    }
  } else if (req.method === "PUT") {
    const { favouriteRecipes } = req.body;

    if (!Array.isArray(favouriteRecipes)) {
      return res.status(400).json({ message: "must be an array of strings" });
    }

    try {
      const user = await prisma.user.update({
        where: { id: String(id) },
        data: { favouriteRecipes },
      });

      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating favourite recipes", error });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method Not Allowed`);
  }
}
