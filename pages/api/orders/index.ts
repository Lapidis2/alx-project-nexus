export const runtime = "edge";

import { NextResponse } from "next/server";

export default async function handler(req: Request) {
  if (req.method === "GET") {
    const orders = [
      { id: 1, user: "Jean Pierre", total: 250, status: "Pending" },
      { id: 2, user: "Alice", total: 400, status: "Completed" },
    ];
    return NextResponse.json(orders);
  }

  if (req.method === "POST") {
    const body = await req.json();
    return NextResponse.json({ message: "Order created", data: body });
  }

  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
