import { BASE_URL, getHeaders, USERS } from "./_config.js";

export default async function handler(req, res) {
  try {
    let allCourses = [];

    for (let i = 0; i < USERS.length; i++) {
      try {
        const headers = getHeaders(i);
        const user = USERS[i];

        const url = `${BASE_URL}/get/mycourseweb?userid=${user.userId}`;

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

          // 🔥 IMPORTANT ADDITIONS
          userIndex: i,
          userId: user.userId,
        }));

        allCourses.push(...courses);

      } catch (err) {
        console.log(`User ${i} failed`);
      }
    }

    // 🔥 dedupe BUT preserve user mapping
    const uniqueCourses = Object.values(
      allCourses.reduce((acc, course) => {
        if (!acc[course.id]) {
          acc[course.id] = course;
        }
        return acc;
      }, {})
    );

    res.status(200).json({
      total: uniqueCourses.length,
      courses: uniqueCourses,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
