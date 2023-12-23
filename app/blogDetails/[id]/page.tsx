import React from "react";
import Image from "next/image";
import Button from "@/components/UI/Button";
import SimilarBlogs from "@/components/blogs/SimilarBlogs";
import Header from "@/components/shared/Header";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";
import { fetchEachBlog } from "@/lib/actions/fetchEachBlog";
import { BlogsTypes, CategoryTypes } from "@/types";

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
    <div className="bg-[#F3F2FA]">
      <Header />
      <div className="max-w-[720px] mx-auto flex flex-col my-10">
        <Image
          src={image}
          alt={title}
          width={720}
          height={328}
          className="h-[328px] w-[720px] object-cover rounded-[12px]"
        />
        <div className="flex flex-col gap-6 mt-10">
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-medium">{author}</h4>
            <div className="text-[#85858D] flex items-center gap-2">
              <p>{publish_date}</p>
              <span>•</span>
              <p>{email}</p>
            </div>
            <h1 className="font-bold text-[40px]">{title}</h1>
            <div className="w-full flex items-center flex-wrap gap-2">
              {categories.map((category: CategoryTypes) => (
                <Button
                  key={category.id}
                  className="rounded-[30px]"
                  style={{
                    color: category.text_color,
                    backgroundColor: category.background_color,
                  }}
                  text={category.title}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#404049]">{description}</p>
          </div>
        </div>
      </div>
      <SimilarBlogs similarBlogs={filteredSimilarBlogs} />
    </div>
  );
};

export default Page;
