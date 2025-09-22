import type { NextApiRequest, NextApiResponse } from "next";

interface MonthSales {
  month: string;
  totalSales: number;
  income: number;
}

const monthlySales: MonthSales[] = [
  { month: "January", totalSales: 120, income: 3000 },
  { month: "February", totalSales: 80, income: 2000 },
  { month: "March", totalSales: 150, income: 4000 },
  { month: "April", totalSales: 90, income: 2500 },
  { month: "May", totalSales: 130, income: 3500 },
  { month: "June", totalSales: 70, income: 1800 },
];

// Allow MonthSales[] or an error message
type ResponseData = MonthSales[] | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    res.status(200).json(monthlySales);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
