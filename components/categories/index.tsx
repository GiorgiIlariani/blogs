import { CategoryTypes } from "@/types";
import React from "react";
import Button from "../UI/Button";

type CategoriesProps = {
  categories: CategoryTypes[];
  selectedCategories: number[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
};

const CategoriesList: React.FC<CategoriesProps> = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const handleCategoryClick = (index: number) => {
    // Calculate the value to be added to the selectedCategories array
    const valueToAdd = index + 1;

    // Check if the category is already selected
    const isSelected = selectedCategories.includes(valueToAdd);

    // If selected, remove from the array; otherwise, add to the array
    setSelectedCategories((prevSelectedCategories) =>
      isSelected
        ? prevSelectedCategories.filter(
            (selectedIndex) => selectedIndex !== valueToAdd
          )
        : [...prevSelectedCategories, valueToAdd]
    );
  };

  return (
    <div className="max-w-[684px] mx-auto flex items-center gap-[10px] flex-wrap">
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
        />
      ))}
    </div>
  );
};

export default CategoriesList;
