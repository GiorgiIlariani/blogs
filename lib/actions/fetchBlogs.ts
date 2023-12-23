export const fetchBlogs = async () => {
  const token = '9bb9745823102147085b39aed78e4580ecb0518ffcc8a0ec0c29a1b09abc8b61';
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