"use client";

import React from "react";
import useSmoothHorizontalScroll from "@/hooks/useSmoothHorizontalScroll";
import EachBlog from "./EachBlog";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BlogsTypes } from "@/types";

interface SimilarBlogsProps {
  similarBlogs: BlogsTypes[];
}

const SimilarBlogs = ({ similarBlogs }: SimilarBlogsProps) => {
  const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } =
    useSmoothHorizontalScroll();

  return (
    <div className="w-full mt-20 max-w-[1288px] mx-auto px-6 sm:px-4 2xs:px-2">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[32px]">მსგავსი სტატიები</h2>
        <div className="flex items-center gap-x-4">
          <div
            className={`flex justify-center items-center w-[38px] h-[38px] rounded-full text-white cursor-pointer ${
              !isAtStart ? "bg-[#5D37F3]" : "bg-[#E4E3EB]"
            }`}
            onClick={() => scrollTo(-424)}>
            <ChevronLeftIcon />
          </div>
          <div
            className={`flex justify-center items-center w-[38px] h-[38px] text-white rounded-full cursor-pointer ${
              !isAtEnd ? "bg-[#5D37F3]" : "bg-[#E4E3EB]"
            }`}
            onClick={() => scrollTo(424)}>
            <ChevronRightIcon />
          </div>
        </div>
      </div>
      <div
        className="w-full flex gap-8 mt-10 items-center overflow-auto no-scrollbar"
        ref={scrollContainerRef as React.RefObject<HTMLDivElement>}
        onScroll={handleScroll}>
        {similarBlogs.map((blog) => (
          <EachBlog
            key={blog.id}
            id={blog.id}
            image={blog.image}
            author={blog.author}
            publish_date={blog.publish_date}
            title={blog.title}
            categories={blog.categories}
            description={blog.description}
            scrolable
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarBlogs;
