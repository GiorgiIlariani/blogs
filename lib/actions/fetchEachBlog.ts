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

    return data;
  } catch (error) {
    console.error("Error fetching blog details:", error);
    throw error;
  }
}