import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
}
