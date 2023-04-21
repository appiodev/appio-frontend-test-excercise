import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string(),

  tickets: z.record(z.number(), z.number()),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const body = schema.safeParse(req.body);

  if (!body.success) {
    res.status(400).json(body.error.errors);
    return;
  }

  res.status(200).json({ success: true });
}
