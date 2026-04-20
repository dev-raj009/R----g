import { BASE_URL, getHeaders, decrypt } from "./_config.js";

export default async function handler(req, res) {
  try {
    const { courseid, subjectid, topicid, conceptid } = req.query;
    const headers = getHeaders(parseInt(req.query.user || "0"));

    const r = await fetch(`${BASE_URL}/get/livecourseclassbycoursesubtopconceptapiv3?courseid=${courseid}&subjectid=${subjectid}&topicid=${topicid}&conceptid=${conceptid}&start=0`, { headers });
    const j = await r.json();

    const content = (j.data || []).map(i => ({
      id: i.id,
      title: i.Title,
      type: i.material_type,
      pdf_url: decrypt(i.pdf_link),
      player_url: i.video_player_url ? i.video_player_url + i.video_player_token : null,
      video_id: i.video_id || null,
    }));

    res.json({ content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
