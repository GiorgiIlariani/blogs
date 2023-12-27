"use client";

import { CategoryTypes } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../../UI/Button";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

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
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

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
    <div
      className="max-w-[670px] mx-auto flex items-center gap-[10px] overflow-x-scroll no-scrollbar whitespace-nowrap"
      {...events}
      ref={ref}>
      {categories.map(({ title, text_color, id, background_color }, index) => (
        <Button
          key={id}
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
      ))}
    </div>
  );
};

export default CategoriesList;
