"use client";

import { CategoryTypes } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../../UI/Button";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

type CategoriesProps = {
  categories: CategoryTypes[];
  selectedCategories: number[];
  setSelectedCategories: Dispatch<SetStateAction<number[]>>;
};
const CategoriesList = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}: CategoriesProps) => {
  const handleCategoryClick = (index: number) => {
    const valueToAdd = index + 1;

    const isSelected = selectedCategories.includes(valueToAdd);

    setSelectedCategories((prevSelectedCategories) =>
      isSelected
        ? prevSelectedCategories.filter(
            (selectedIndex) => selectedIndex !== valueToAdd
          )
        : [...prevSelectedCategories, valueToAdd]
    );
  };

  return (
    <div className="max-w-[670px] mx-auto flex items-center gap-[10px]">
      <Swiper
        mousewheel
        direction="horizontal"
        className="mySwiper"
        slidesPerView={"auto"}
        spaceBetween={10}
        pagination={false}>
        {categories.map(
          ({ title, text_color, id, background_color }, index) => (
            <SwiperSlide key={id} style={{ width: "auto" }} className="w-auto">
              <Button
                onClick={() => handleCategoryClick(index)}
                text={title}
                style={{
                  color: text_color,
                  backgroundColor: background_color,
                  border: selectedCategories.includes(index + 1)
                    ? "1px solid #000000"
                    : "1px solid transparent",
                }}
                className=""
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default CategoriesList;
