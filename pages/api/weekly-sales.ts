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

// Helper function to simulate delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DaySales[]>
) {
  try {
  
    await delay(500);

   
    res.status(200).json(weeklySales);
  } catch (error) {
    console.error("Error in /api/weekly-sales:", error);
    res.status(500).json([]);
  }
}
