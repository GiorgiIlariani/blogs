import React from "react";
import SimilarBlogs from "@/components/content/blogs/SimilarBlogs";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";
import { fetchEachBlog } from "@/lib/actions/fetchEachBlog";
import BlogDetails from "@/components/content/blogs/BlogDetails";
import { BlogsTypes, CategoryTypes } from "@/types";
import BackBtn from "@/components/UI/BackBtn";

const Page = async ({ params }: { params: { id: string } }) => {
  const blogDetails = await fetchEachBlog(Number(params.id));
  const data = await fetchBlogs([], 1);

  // const { title, description, image, publish_date, categories, author, email } =
  //   blogDetails;

  // Filter out the currentblogDetails?. blog from the list of similar blogs
  const filteredSimilarBlogs = data.data.filter(
    (blog: BlogsTypes) =>
      blog.id !== Number(params.id) && // Exclude the current blog
      blog.categories.some((category) =>
        blogDetails?.categories.some((c: CategoryTypes) => c.id === category.id)
      )
  );

  return (
    <>
      <BackBtn />
      <div className="py-10">
        <div className="max-w-[720px] mx-auto flex flex-col my-10 px-6 sm:px-2">
          <BlogDetails
            title={blogDetails?.title}
            description={blogDetails?.description}
            image={blogDetails?.image}
            publish_date={blogDetails?.publish_date}
            categories={blogDetails?.categories}
            author={blogDetails?.author}
            email={blogDetails?.email}
          />
        </div>
        <div className="w-full px-4">
          <SimilarBlogs similarBlogs={filteredSimilarBlogs} />
        </div>
      </div>
    </>
  );
};

export default Page;
