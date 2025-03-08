export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, isValid, timestamp } = req.body;
    console.log(`[${timestamp}] Name: ${name} | Valid: ${isValid}`);
    return res.status(200).json({ success: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}