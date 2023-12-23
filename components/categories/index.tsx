"use client";

import { CategoryTypes } from "@/types";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";

type CategoriesProps = {
  categories: CategoryTypes[];
};

const CategoriesList: React.FC<CategoriesProps> = ({ categories }) => {
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categoryTitles, setCategoryTitles] = useState<string[]>([]);

  const handleCategoryClick = (index: number, title: string) => {
    const valueToAdd = index + 1;

    setSelectedCategories((prev) =>
      prev.includes(valueToAdd)
        ? prev.filter((selectedIndex) => selectedIndex !== valueToAdd)
        : [...prev, valueToAdd]
    );
    setCategoryTitles((prev) =>
      prev.includes(title)
        ? prev.filter((selectedTitle) => selectedTitle !== title)
        : [...prev, title]
    );
  };

  useEffect(() => {
    const categoriesString = categoryTitles.join("&");
    router.push(`/?${categoriesString}`);
  }, [selectedCategories]);

  return (
    <div className="max-w-[684px] mx-auto flex items-center gap-[10px] flex-wrap">
      {categories.map(({ title, text_color, id, background_color }, index) => (
        <Button
          key={id}
          onClick={() => handleCategoryClick(index, title)}
          text={title}
          style={{
            color: text_color,
            backgroundColor: background_color,
            border: selectedCategories.includes(index + 1)
              ? "1px solid #000000"
              : "1px solid transparent",
          }}
        />
      ))}
    </div>
  );
};

export default CategoriesList;
