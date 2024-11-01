import { NextApiRequest, NextApiResponse } from "next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Next.js API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./pages/api/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(swaggerSpec);
}
