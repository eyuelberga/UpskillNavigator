import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from 'next'
 

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "org.config.json");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  res.status(200).json(JSON.parse(fileContents));
}
