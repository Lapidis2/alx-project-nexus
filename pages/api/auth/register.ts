
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const fakeToken = "test-verification-token"; 

  res.status(201).json({ message: "User registered successfully" ,token:fakeToken});
}
