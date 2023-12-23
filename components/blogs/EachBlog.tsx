import React from "react";
import { BlogsTypes } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Button from "../UI/Button";
// import { Button } from "../ui/button";

export interface EachBlogProps extends BlogsTypes {
  scrolable?: boolean;
}

const EachBlog = ({
  id,
  image,
  author,
  publish_date,
  title,
  categories,
  description,
  scrolable = false,
}: EachBlogProps) => {
  return (
    <div
      className={`max-w-[408px] flex flex-col gap-4 my-4 ${
        scrolable ? "w-[calc(33.33%-14px)] flex-shrink-0" : ""
      }`}>
      <Link href={`/blogDetails/${id}`} className="cursor-pointer">
        <Image
          src={image}
          alt="test img"
          width={408}
          height={328}
          className="object-cover w-[408px] h-[328px] rounded-[12px]"
        />
      </Link>
      <div className="w-full flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <h4 className="text-base font-semibold">{author}</h4>
          <p className="text-xs text-[#85858D]">{publish_date}</p>
        </div>
        <h3 className="text-xl xs:text-lg font-semibold h-14">{title}</h3>
        <div className="w-full flex items-center gap-4 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <Button
              type="button"
              key={category.id}
              className="rounded-[30px] whitespace-nowrap"
              style={{
                color: category.text_color,
                backgroundColor: category.background_color,
              }}
              text={category.title}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-base xs:text-sm font-normal">{`${description.slice(
            0,
            85
          )}...`}</p>
          <div className="flex items-center gap-1 cursor-pointer">
            <p className="text-[#5D37F3] text-sm font-medium"> სრულად ნახვა</p>
            <Image
              src="/assets/images/Arrow.png"
              alt="arrow"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachBlog;
