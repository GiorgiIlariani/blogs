import React, { Suspense } from "react";
import Blogs from "@/components/blogs";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import FetchBlogsLoading from "@/components/loadings/fetchAllBlogsLoading";

const HomePage = async () => {
  const categories = await fetchCategories();
  const { data } = await fetchBlogs();

  return (
    <div className="bg-[#F3F2FA] min-h-screen">
      <Header />
      <div className="w-full px-4">
        <Hero />
        <Suspense fallback={<FetchBlogsLoading />}>
          <Blogs blogs={data} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
