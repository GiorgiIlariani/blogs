import React from "react";
import SimilarBlogs from "@/components/blogs/SimilarBlogs";
import Header from "@/components/shared/Header";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";
import { fetchEachBlog } from "@/lib/actions/fetchEachBlog";
import { BlogsTypes, CategoryTypes } from "@/types";
import BlogDetails from "@/components/blogs/BlogDetails";

const Page = async ({ params }: { params: { id: string } }) => {
  const blogDetails = await fetchEachBlog(Number(params.id));
  const { data } = await fetchBlogs();

  const { title, description, image, publish_date, categories, author, email } =
    blogDetails;

  // Filter out the current blog from the list of similar blogs
  const filteredSimilarBlogs = data.filter(
    (blog: BlogsTypes) =>
      blog.id !== Number(params.id) && // Exclude the current blog
      blog.categories.some((category) =>
        categories.some((c: CategoryTypes) => c.id === category.id)
      )
  );

  return (
    <div className="bg-[#F3F2FA] pb-10">
      <div className="max-w-[720px] mx-auto flex flex-col my-10 px-6 sm:px-4 2xs:px-2">
        <BlogDetails
          title={title}
          description={description}
          image={image}
          publish_date={publish_date}
          categories={categories}
          author={author}
          email={email}
        />
      </div>
      {/* <SimilarBlogs similarBlogs={filteredSimilarBlogs} /> */}
    </div>
  );
};

export default Page;
