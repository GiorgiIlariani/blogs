"use client";

import React, { useState } from "react";
import EachBlog from "./EachBlog";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BlogsTypes } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

interface SimilarBlogsProps {
  similarBlogs: BlogsTypes[];
}

const SimilarBlogs = ({ similarBlogs }: SimilarBlogsProps) => {
  const [slidePosition, setSlidePosition] = useState(0);

  return (
    <div className="w-full mt-20 max-w-[1288px] mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[32px] md:text-[24px] xs:text-[20px]">
          მსგავსი სტატიები
        </h2>
        <div className="flex items-center gap-x-4">
          <div
            className={`flex justify-center items-center w-[38px] h-[38px] rounded-full text-white cursor-pointer ${
              // !isAtStart ? "bg-[#5D37F3]" : "bg-[#E4E3EB]"'
              ""
            }`}
            // onClick={() => scrollTo(-424)}
          >
            <ChevronLeftIcon />
          </div>
          <div
            className={`flex justify-center items-center w-[38px] h-[38px] text-white rounded-full cursor-pointer ${
              // !isAtEnd ? "bg-[#5D37F3]" : "bg-[#E4E3EB]"
              ""
            }`}
            // onClick={() => scrollTo(424)}
          >
            <ChevronRightIcon />
          </div>
        </div>
      </div>
      <Swiper
        mousewheel
        direction="horizontal"
        className="mySwiper"
        onSlideChange={() => console.log("slide change")}
        pagination={false}
        breakpoints={{
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          700: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}>
        {similarBlogs.map((blog) => (
          <SwiperSlide className="flex flex-col gap-4 my-4" key={blog.id}>
            <EachBlog
              id={blog.id}
              image={blog.image}
              author={blog.author}
              publish_date={blog.publish_date}
              title={blog.title}
              categories={blog.categories}
              description={blog.description}
              scrolable={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarBlogs;
