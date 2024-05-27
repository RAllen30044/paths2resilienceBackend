import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { client } from "./prismaClient";
import z from "zod";

const donorController = Router();

donorController.get("/donors", async (_req, res) => {
  const donors = await client.donor.findMany({
    orderBy: {
      amount: "desc",
    },
  });
  res.json(donors);
});

donorController.post(
  "/donors",
  validateRequest({
    body: z.object({
      email: z.string().email(),
      name: z.string(),
      amount: z.number(),
    }),
  }),
  async (req, res) => {
    const { amount, name, email } = req.body;
    try {
      const donor = await client.donor.create({
        data: {
          email,
          name,
          amount,
        },
      });
      res.sendStatus(200).json(donor);
    } catch (err) {
      res.sendStatus(500).json("Internal Server Error");
    }
  }
);

export { donorController };
