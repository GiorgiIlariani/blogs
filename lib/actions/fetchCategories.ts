export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/categories",
      {
        headers: {
          Authorization: `Bearer 9bb9745823102147085b39aed78e4580ecb0518ffcc8a0ec0c29a1b09abc8b61`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories. Status: ${response.status}`);
    }

    const { data } = await response.json();

    return data;
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};
