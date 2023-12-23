import { BlogsTypes, CategoryTypes } from "@/types";
import BlogsList from "./BlogsList";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";

type BlogsProps = {
  selectedCategories: string[];
};

const Blogs: React.FC<BlogsProps> = async ({ selectedCategories }) => {
  const { data } = await fetchBlogs();

  const filteredBlogs =
    selectedCategories.length === 0
      ? data.filter(
          (blog: BlogsTypes) => new Date(blog.publish_date) <= new Date()
        ) // Add this condition
      : data.filter(
          (blog: BlogsTypes) =>
            blog.categories.some((category) =>
              selectedCategories.includes(category.title)
            ) && new Date(blog.publish_date) <= new Date() // Add this condition
        );

  return (
    <>
      <BlogsList filteredBlogs={filteredBlogs} />
    </>
  );
};

export default Blogs;
