import { BlogsTypes } from "@/types";
import { token } from "./accessToken";

export const fetchBlogs = async (categories: number[]) => {
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
    

    if (categories.length === 0) {
      return data.filter((blog: BlogsTypes) => new Date(blog.publish_date) <= new Date());
    } else {
      return data.filter(
        (blog: BlogsTypes) =>
          blog.categories.some((category) => categories.includes(category.id)) &&
          new Date(blog.publish_date) <= new Date()
      );
    }

  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};