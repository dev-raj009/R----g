export default async function handler(req, res) {
  try {
    const r = await fetch(req.query.url);
    const j = await r.json();
    res.json(j);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
