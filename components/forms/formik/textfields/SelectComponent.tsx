"use client";

import React, { useEffect, useState } from "react";
import { SelectComponentProps, CategoryTypes } from "@/types";
import { useField } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import Button from "@/components/UI/Button";
import { IoIosClose } from "react-icons/io";

const SelectComponent = (props: SelectComponentProps) => {
  const { name, label, placeholder, setFieldValue, categories } = props;

  const [field] = useField(name);
  const [selectedCategories, setSelectedCategories] = useState<CategoryTypes[]>(
    (typeof window !== "undefined" &&
      JSON.parse(sessionStorage.getItem(name)!)) ||
      []
  );
  const [showOptions, setShowOptions] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isCategoryRemoved, setIsCategoryRemoved] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if the click is outside the SelectComponent
      if (
        !target.closest(".select-div") &&
        !target.closest(".categories-div")
      ) {
        setShowOptions(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem(name, JSON.stringify(field.value));
  }, [field.value, name]);

  const handleCategories = (category: CategoryTypes) => {
    const exists = selectedCategories.some(
      (selectedCategory) => selectedCategory.id === category.id
    );

    if (!exists) {
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        category,
      ]);
    }

    if (!field.value.includes(category.id)) {
      setFieldValue!(name, [...field.value, category]);
    }
  };

  const handleCategoryRemove = (id: number) => {
    const filteredCategories = selectedCategories.filter(
      (item) => item.id !== id
    );

    setFieldValue!(name, filteredCategories);
    setSelectedCategories(filteredCategories);
    setIsCategoryRemoved(true);
  };

  const handleOptions = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is the remove icon
    const isRemoveIconClicked =
      e.target && (e.target as HTMLElement).closest(".remove-icon");

    if (!isRemoveIconClicked) {
      setShowOptions((prev) => !prev);
      setIsTouched(true);
    }
  };

  const hasError = isTouched && field.value.length === 0;
  const isValid = field.value.length > 0;

  return (
    <div className="flex flex-col gap-[10px] w-full relative">
      <h3 className="font-semibold text-base">{label}</h3>
      <div
        className={`w-full h-[44px] rounded-[12px] flex items-center gap-2 overflow-x-hidden overflow-y-hidden text-xs relative px-[10px] cursor-pointer border select-div
        ${
          isValid
            ? "border-success"
            : hasError && isCategoryRemoved
            ? "border-warning"
            : isTouched && !isValid && showOptions
            ? "border-[#5D37F3]"
            : ""
        }
        `}
        onClick={handleOptions}>
        {field.value.map((item: CategoryTypes) => (
          <Button
            text={item.title}
            key={item.id}
            style={{
              backgroundColor: item.background_color,
              color: item.text_color,
            }}
            className="h-8 py-[6px] px-3 rounded-[30px] text-nowrap"
            endDecorator={
              <div
                className="text-white text-xl flex items-center justify-center cursor-pointer remove-icon"
                onClick={() => handleCategoryRemove(item.id)}>
                <IoIosClose />
              </div>
            }
          />
        ))}
        {field.value.length === 0 ? (
          <p className="text-[#85858D] text-sm">{placeholder}</p>
        ) : null}
        <div className="absolute h-full right-0 px-[10px] py-0 bg-white flex items-center justify-center">
          <IoIosArrowDown className="w-6 h-6 cursor-pointer text-sm" />
        </div>
      </div>
      {showOptions && (
        <div className="w-full max-h-[144px] flex flex-wrap gap-2 border border-[#e4e3eb] rounded-[12px] p-[10px] overflow-y-scroll absolute top-20 bg-white categories-div">
          {categories?.map((item) => (
            <Button
              text={item.title}
              key={item.id}
              style={{
                backgroundColor: item.background_color,
                color: item.text_color,
              }}
              className="py-[6px] px-3 rounded-[30px] cursor-pointer text-sm"
              onClick={() => handleCategories(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
