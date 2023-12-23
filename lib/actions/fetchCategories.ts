export const fetchCategories = async () => {
  const token = '59b997d3c0d701d70d3f7aaf05a79698f07ac3cab638ee76504ec60ecfad9797';
  try {
    const response = await fetch(
      "https://api.blog.redberryinternship.ge/api/categories",
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
