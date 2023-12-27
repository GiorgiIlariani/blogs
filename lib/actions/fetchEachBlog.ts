import { token } from "./accessToken";

export const fetchEachBlog = async (id: number) => {
  try {
    const response = await fetch(`https://api.blog.redberryinternship.ge/api/blogs/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog details. Status: ${response.status}`);
    }

    const data = await response.json();
    

    // Check if data.email exists, and return it or an empty string accordingly
    const email = data.email ? data.email : '';

    return {
      ...data,
      email: email,
    };
  } catch (error) {
    console.error("Error fetching blog details:", error);
    throw error;
  }
}