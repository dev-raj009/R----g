import { BASE_URL, getHeaders, USERS } from "./_config.js";

export default async function handler(req, res) {
  try {
    const { testseriesid, subject_id } = req.query;
    const idx = parseInt(req.query.user || "0");
    const headers = getHeaders(idx);

    const r = await fetch(`${BASE_URL}/get/test_titlev2?testseriesid=${testseriesid}&subject_id=${subject_id}&userid=${USERS[idx].userId}&start=-1`, { headers });
    const j = await r.json();

    res.json({ tests: (j.test_titles || []).map(t => ({ id: t.id, title: t.title, questions_url: t.test_questions_url })) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
