import React, { Suspense } from "react";
import Blogs from "@/components/blogs";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import FetchBlogsLoading from "@/components/loadings/fetchAllBlogsLoading";
import CategoriesList from "@/components/categories";

async function HomePage({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const categories = await fetchCategories();
  const selectedCategories = Object.keys(searchParams || {});

  return (
    <div className="bg-[#F3F2FA] min-h-screen">
      <Header />
      <div className="w-full px-4">
        <Hero />
        <CategoriesList categories={categories} />
        <Suspense fallback={<FetchBlogsLoading />}>
          <Blogs selectedCategories={selectedCategories} />
        </Suspense>
      </div>
    </div>
  );
}

export default HomePage;
