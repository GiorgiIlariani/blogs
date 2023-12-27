"use client";

import { BlogsTypes, CategoryTypes } from "@/types";
import BlogsList from "./blogs/BlogsList";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";
import { useEffect, useState } from "react";
import CategoriesList from "./categories";
import FetchBlogsLoading from "../loadings/fetchAllBlogsLoading";
import { fetchCategories } from "@/lib/actions/fetchCategories";

type BlogsProps = {
  // categories: CategoryTypes[];
};

const MainContent: React.FC<BlogsProps> = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [blogs, setBlogs] = useState<BlogsTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogs(selectedCategories);
        const categories = await fetchCategories();

        setBlogs(data);
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [selectedCategories]);

  return (
    <>
      <CategoriesList
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      {isLoading ? <FetchBlogsLoading /> : <BlogsList filteredBlogs={blogs} />}
    </>
  );
};

export default MainContent;
