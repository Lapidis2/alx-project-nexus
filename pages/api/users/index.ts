export const runtime = "edge";

import { NextResponse } from "next/server";

export default async function handler(req: Request) {
  if (req.method === "GET") {
    const users = [
      { id: 1, name: "Jean Pierre", email: "jean@gmail.com" },
      { id: 2, name: "Alice", email: "alice@example.com" },
    ];
    return NextResponse.json(users);
  }

  if (req.method === "POST") {
    const body = await req.json();
    return NextResponse.json({ message: "User created", data: body });
  }

  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
