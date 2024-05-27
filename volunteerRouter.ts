import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { client } from "./prismaClient";
import z from "zod";
const volunteersController = Router();

volunteersController.get("/volunteers", async (_req, res) => {
  const volunteers = await client.volunteer.findMany({
    orderBy: {
      lastName: "asc",
    },
  });
  res.json(volunteers);
});

volunteersController.post(
  "/volunteers",
  validateRequest({
    body: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      phoneNumber: z.string(),
    }),
  }),
  async (req, res) => {
    const { firstName, lastName, email, phoneNumber } = req.body;

    try {
      const volunteer = await client.volunteer.create({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
      });
      res.status(200).json(volunteer);
    } catch (error) {
      res.status(500).json("Internal Server error" + error);
    }
  }
);

export { volunteersController };
