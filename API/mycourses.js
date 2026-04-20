import { BASE_URL, getHeaders } from "./_config.js";

export default async function handler(req, res) {
  try {
    const userIndex = parseInt(req.query.user || "0");
    const headers = getHeaders(userIndex);

    const userId = headers["user-id"];

    const url = `${BASE_URL}/get/mycourseweb?userid=${userId}`;

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    const courses = (data.data || []).map(c => ({
      id: c.id,
      name: c.course_name,
      thumbnail: c.course_thumbnail,
      expiry: c.expiryDate,
      is_paid: c.is_paid,
    }));

    res.status(200).json({
      total: courses.length,
      courses,
    });

  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch courses",
      details: err.message,
    });
  }
}
