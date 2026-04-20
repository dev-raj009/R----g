import { BASE_URL, getHeaders } from "./_config.js";

export default async function handler(req, res) {
  try {
    const { courseid, subjectid } = req.query;
    const headers = getHeaders(parseInt(req.query.user || "0"));

    const r = await fetch(`${BASE_URL}/get/alltopicfrmlivecourseclass?courseid=${courseid}&subjectid=${subjectid}&start=-1`, { headers });
    const j = await r.json();

    res.json({ topics: (j.data || []).map(t => ({ id: t.topicid, name: t.topic_name })) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
