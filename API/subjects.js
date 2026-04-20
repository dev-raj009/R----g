import { BASE_URL, getHeaders } from "./_config.js";

export default async function handler(req, res) {
  try {
    const { courseid } = req.query;
    const headers = getHeaders(parseInt(req.query.user || "0"));

    const r = await fetch(`${BASE_URL}/get/allsubjectfrmlivecourseclass?courseid=${courseid}&start=-1`, { headers });
    const j = await r.json();

    res.json({ subjects: (j.data || []).map(s => ({ id: s.subjectid, name: s.subject_name })) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
