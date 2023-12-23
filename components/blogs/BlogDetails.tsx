import { fetchEachBlog } from "@/lib/actions/fetchEachBlog";
import { CategoryTypes } from "@/types";
import Image from "next/image";
import React from "react";
import Button from "../UI/Button";

type BlogDetailsProps = {
  title: string;
  description: string;
  image: string;
  publish_date: string;
  categories: CategoryTypes[];
  author: string;
  email: string;
};

const BlogDetails: React.FC<BlogDetailsProps> = async ({
  title,
  description,
  image,
  publish_date,
  categories,
  author,
  email,
}) => {
  return (
    <>
      <Image
        src={image}
        alt={title}
        width={720}
        height={328}
        className="h-[328px] w-[720px] object-cover rounded-[12px]"
      />
      <div className="flex flex-col gap-6 mt-10 sm:mt-6">
        <div className="flex flex-col gap-3">
          <h4 className="text-base font-medium">{author}</h4>
          <div className="text-[#85858D] flex items-center gap-2">
            <p>{publish_date}</p>
            <span>•</span>
            <p>{email}</p>
          </div>
          <h1 className="font-bold text-[40px] sm:text-[28px] xs:text-[20px]">
            {title}
          </h1>
          <div className="w-full flex items-center flex-wrap gap-2">
            {categories.map((category: CategoryTypes) => (
              <Button
                key={category.id}
                className="rounded-[30px] cursor-default"
                style={{
                  color: category.text_color,
                  backgroundColor: category.background_color,
                }}
                text={category.title}
              />
            ))}
          </div>
        </div>
        <p className="text-[#404049]">{description}</p>
      </div>
    </>
  );
};

export default BlogDetails;
