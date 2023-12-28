import { BlogsTypes } from "@/types";
import { token } from "./accessToken";

export const fetchBlogs = async (categories: number[], page: number, pageSize = 6) => {
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

    const { data } = await response.json();

    // Filter data based on categories
    const filteredData = categories.length === 0
      ? data.filter((blog: BlogsTypes) => new Date(blog.publish_date) <= new Date())
      : data.filter(
          (blog: BlogsTypes) =>
            blog.categories.some((category) => categories.includes(category.id)) &&
            new Date(blog.publish_date) <= new Date()
      );

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const totalBlogs = filteredData.length; // Total number of blogs before pagination

    // Calculate isNext similar to fetchAllNews
    const isNext = totalBlogs > endIndex;

    return { blogs: paginatedData, isNext, allDocument: filteredData.length };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
