"use client";

import { BlogsTypes, CategoryTypes } from "@/types";
import BlogsList from "./blogs/BlogsList";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";
import { useEffect, useState } from "react";
import CategoriesList from "./categories";
import FetchBlogsLoading from "../loadings/fetchAllBlogsLoading";

type BlogsProps = {
  categories: CategoryTypes[];
};

const MainContent: React.FC<BlogsProps> = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [blogs, setBlogs] = useState<BlogsTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogs(selectedCategories);

        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
