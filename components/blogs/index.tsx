"use client";

import CategoriesList from "../categories";
import { BlogsTypes, CategoryTypes } from "@/types";
import BlogsList from "./BlogsList";
import { useState } from "react";
type BlogsProps = {
  blogs: BlogsTypes[];
  categories: CategoryTypes[];
};

const Blogs: React.FC<BlogsProps> = async ({ blogs, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const filteredBlogs =
    selectedCategories.length === 0
      ? blogs.filter((blog) => new Date(blog.publish_date) <= new Date()) // Add this condition
      : blogs.filter(
          (blog) =>
            blog.categories.some((category) =>
              selectedCategories.includes(category.id)
            ) && new Date(blog.publish_date) <= new Date() // Add this condition
        );

  return (
    <>
      <CategoriesList
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        categories={categories}
      />
      <BlogsList filteredBlogs={filteredBlogs} />
    </>
  );
};

export default Blogs;
