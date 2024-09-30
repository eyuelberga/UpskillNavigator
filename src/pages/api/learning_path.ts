import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "@/utils/openai/agent";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const userMessage = `Could you create a learning path for me given my current information and my career goals?
    Here is my profile in a json format:
    ${JSON.stringify(data.profile)}
  And my career goal is:
  
  '${data.goal}' 
    `;
    const response = await generate(userMessage);
    res.status(200).json(response);
  } else if (req.method === "PUT") {
    const data = JSON.parse(req.body);
    const userMessage = `Given this learning path you generated for me:
    ${JSON.stringify(data.learning_path)}
    
    And my profile in a json format:
    
    ${JSON.stringify(data.profile)}
  
    Could you make changes to it based on this request:
  
  '${data.prompt}' 
    `;

    const response = await generate(userMessage);
    res.status(200).json(response);
  } else {
    res.status(200).json({ success: true });
  }
}
