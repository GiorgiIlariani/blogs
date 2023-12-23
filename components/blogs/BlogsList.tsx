import { BlogsTypes } from "@/types";
import React from "react";
import EachBlog from "./EachBlog";

type BlogsListProps = {
  filteredBlogs: BlogsTypes[];
};

const BlogsList = ({ filteredBlogs }: BlogsListProps) => {
  return (
    <div className="w-full flex flex-wrap items-start blogsSection:justify-center gap-8 max-w-[1288px] mx-auto py-[96px]">
      {filteredBlogs.map((blog) => {
        const filteredCategoriesArr = blog.categories.map(
          (category) => category
        );
        return (
          <EachBlog
            key={blog.id}
            id={blog.id}
            image={blog.image}
            author={blog.author}
            publish_date={blog.publish_date}
            title={blog.title}
            categories={filteredCategoriesArr}
            description={blog.description}
          />
        );
      })}
    </div>
  );
};

export default BlogsList;
