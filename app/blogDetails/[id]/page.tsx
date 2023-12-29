"use client";

import React, { useState, useEffect } from "react";
import SimilarBlogs from "@/components/content/blogs/SimilarBlogs";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";
import { fetchEachBlog } from "@/lib/actions/fetchEachBlog";
import BlogDetails from "@/components/content/blogs/BlogDetails";
import { BlogsTypes, CategoryTypes } from "@/types";
import BackBtn from "@/components/UI/BackBtn";
import BlogDetailsLoading from "@/components/loadings/blogDetailsLoading";

type UpdatedBlogsTypes = BlogsTypes & {
  email: string;
};

const Page = ({ params }: { params: { id: string } }) => {
  const [blogDetails, setBlogDetails] = useState<UpdatedBlogsTypes>();
  const [similarBlogs, setSimilarBlogs] = useState<BlogsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const blogDetailsData = await fetchEachBlog(Number(params.id));
        setBlogDetails(blogDetailsData);

        const blogsData = await fetchBlogs([], 1);
        const filteredBlogs = blogsData.data.filter(
          (blog: BlogsTypes) =>
            blog.id !== Number(params.id) &&
            blog.categories.some((category) =>
              blogDetailsData?.categories.some(
                (c: CategoryTypes) => c.id === category.id
              )
            )
        );
        setSimilarBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <>
      <BackBtn />
      <div className="py-10">
        <div className="max-w-[720px] mx-auto flex flex-col my-10 px-6 sm:px-2">
          {loading ? (
            <BlogDetailsLoading />
          ) : (
            <BlogDetails
              title={blogDetails?.title || ""}
              description={blogDetails?.description || ""}
              image={blogDetails?.image || ""}
              publish_date={blogDetails?.publish_date || ""}
              categories={blogDetails?.categories || []}
              author={blogDetails?.author || ""}
              email={blogDetails?.email || ""}
            />
          )}
        </div>
        <div className="w-full px-4">
          <SimilarBlogs similarBlogs={similarBlogs} />
        </div>
      </div>
    </>
  );
};

export default Page;
