"use client";

import { BlogsTypes, CategoryTypes } from "@/types";
import BlogsList from "./blogs/BlogsList";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";
import { useEffect, useState } from "react";
import CategoriesList from "./categories";
import FetchBlogsLoading from "../loadings/fetchAllBlogsLoading";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import PaginationComponent from "../shared/PaginationComponent";

const MainContent = ({ page }: { page: number }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>(() => {
    const storedCategories =
      typeof window !== "undefined" &&
      sessionStorage.getItem("filteredCategories");
    return storedCategories ? JSON.parse(storedCategories) : [];
  });
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [blogs, setBlogs] = useState<BlogsTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [allBlogs, setAllBlogs] = useState(0);

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
        const data = await fetchBlogs(selectedCategories, page, 6);
        setBlogs(data.blogs);
        setIsNext(data.isNext);
        setAllBlogs(data.allDocument);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogsData();
  }, [selectedCategories, page]);

  return (
    <>
      <CategoriesList
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      {isLoading ? (
        <FetchBlogsLoading />
      ) : (
        <>
          <BlogsList filteredBlogs={blogs} />
          {blogs.length > 0 && (
            <div className="w-full my-10 flex items-center justify-center">
              <PaginationComponent
                isNext={isNext || false}
                pageNumber={page || 1}
                totalCounts={allBlogs}
                path="/"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MainContent;
