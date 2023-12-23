"use client";

import React, { useState } from "react";
import CategoriesList from "../categories";
import { BlogsTypes, CategoryTypes } from "@/types";
import BlogsList from "./BlogsList";

type BlogsProps = {
  blogs: BlogsTypes[];
  categories: CategoryTypes[];
};

const Blogs = ({ blogs, categories }: BlogsProps) => {
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
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <BlogsList filteredBlogs={filteredBlogs} />
    </>
  );
};

export default Blogs;
