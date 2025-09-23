export const runtime = "edge";

import { NextResponse } from "next/server";

export default async function handler(req: Request) {
  if (req.method === "GET") {
    const stores = [
      { id: 1, name: "Main Store", location: "Kigali" },
      { id: 2, name: "Branch Store", location: "Huye" },
    ];
    return NextResponse.json(stores);
  }

  if (req.method === "POST") {
    const body = await req.json();
    return NextResponse.json({ message: "Store created", data: body });
  }

  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
