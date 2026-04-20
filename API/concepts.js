import { BASE_URL, getHeaders } from "./_config.js";

export default async function handler(req, res) {
  try {
    const { courseid, subjectid, topicid } = req.query;
    const headers = getHeaders(parseInt(req.query.user || "0"));

    const r = await fetch(`${BASE_URL}/get/allconceptfrmlivecourseclass?courseid=${courseid}&subjectid=${subjectid}&topicid=${topicid}&start=-1`, { headers });
    const j = await r.json();

    res.json({ concepts: (j.data || []).map(c => ({ id: c.conceptid, name: c.concept_name, type: c.concept_name.toLowerCase() })) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
