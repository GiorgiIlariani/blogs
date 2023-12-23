export const fetchEachBlog = async (id: number) => {
  const token = '59b997d3c0d701d70d3f7aaf05a79698f07ac3cab638ee76504ec60ecfad9797';

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