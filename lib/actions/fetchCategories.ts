import { token } from "./accessToken";

export const fetchCategories = async () => {
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
