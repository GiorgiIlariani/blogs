"use client";

import React, { useCallback, useMemo, useState } from "react";
import EachBlog from "./EachBlog";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BlogsTypes } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Navigation } from "swiper/modules";

interface SimilarBlogsProps {
  similarBlogs: BlogsTypes[];
}

const SimilarBlogs = ({ similarBlogs }: SimilarBlogsProps) => {
  return (
    <div className="w-full mt-20 max-w-[1288px] mx-auto relative">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[32px] md:text-[24px] xs:text-[20px]">
          მსგავსი სტატიები
        </h2>
        <div className="flex items-center gap-x-4">
          <button className="image-swiper-btn image-swiper-button-prev">
            <ChevronLeftIcon />
          </button>
          <button className="image-swiper-btn image-swiper-button-next">
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <Swiper
        mousewheel
        direction="horizontal"
        className="mySwiper"
        pagination={false}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        modules={[Navigation]}
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarBlogs;
