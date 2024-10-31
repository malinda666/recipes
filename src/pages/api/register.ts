import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface RegisterRequest extends NextApiRequest {
  body: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
  };
}

export default async function handler(
  req: RegisterRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstname, lastname, email, phone, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          phone,
          password: hashedPassword,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error("Signp failed", error);
      res.status(400).json({
        message: "Signup Failed",
        error,
      });
    }
  } else {
    res.status(405).end();
  }
}
