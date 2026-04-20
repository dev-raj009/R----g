import { BASE_URL, getHeaders, decrypt } from "./_config.js";

export default async function handler(req, res) {
  try {
    const { video_id } = req.query;
    const headers = getHeaders(parseInt(req.query.user || "0"));

    const r = await fetch(`${BASE_URL}/get/fetchVideoDetailsById?course_id=257&video_id=${video_id}&ytflag=0&folder_wise_course=0&lc_app_api_url=`, { headers });
    const j = await r.json();

    const streams = (j.data?.encrypted_links || []).map(q => ({
      quality: q.quality,
      url: decrypt(q.path),
      key: decrypt(q.key),
    }));

    res.json({ streams });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
