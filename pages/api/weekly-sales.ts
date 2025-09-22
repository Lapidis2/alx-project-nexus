import type { NextApiRequest, NextApiResponse } from "next";

type DaySales = {
  day: string;
  totalSales: number;
};

const weeklySales: DaySales[] = [
  { day: "Monday", totalSales: 500 },
  { day: "Tuesday", totalSales: 700 },
  { day: "Wednesday", totalSales: 600 },
  { day: "Thursday", totalSales: 800 },
  { day: "Friday", totalSales: 900 },
  { day: "Saturday", totalSales: 750 },
  { day: "Sunday", totalSales: 650 },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DaySales[]>
) {
  // Simulate a delay for realism
  setTimeout(() => {
    res.status(200).json(weeklySales);
  }, 500);
}
