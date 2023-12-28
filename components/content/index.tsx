"use client";

import { BlogsTypes, CategoryTypes } from "@/types";
import BlogsList from "./blogs/BlogsList";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";
import { useEffect, useState } from "react";
import CategoriesList from "./categories";
import FetchBlogsLoading from "../loadings/fetchAllBlogsLoading";
import { fetchCategories } from "@/lib/actions/fetchCategories";

const MainContent = ({ page }: { page: number }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [blogs, setBlogs] = useState<BlogsTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categories = await fetchCategories();

        setCategories(categories);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogs(selectedCategories);

        setBlogs(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogsData();
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
