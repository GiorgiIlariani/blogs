export const fetchBlogs = async () => {
  const token = '59b997d3c0d701d70d3f7aaf05a79698f07ac3cab638ee76504ec60ecfad9797';
  try {
    const response = await fetch("https://api.blog.redberryinternship.ge/api/blogs", {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs. Status: ${response.status}`);
    }

    const data = response.json();

    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};