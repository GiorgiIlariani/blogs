"use client";

import React, { useEffect, useState } from "react";
import { SelectComponentProps, CategoryTypes } from "@/types";
import { useField } from "formik";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import { IoIosArrowDown } from "react-icons/io";
import Button from "@/components/UI/Button";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";

const SelectComponent = (props: SelectComponentProps) => {
  const { name, label, placeholder, setFieldValue } = props;
  const [field, meta] = useField(name);
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryTypes[]>(
    []
  );
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const categories = await fetchCategories();

        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAllCategories();
  }, []);

  const hasError = meta.touched && selectedCategories.length === 0;

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
      setFieldValue!(name, [...field.value, category.id]);
    }
  };

  const handleCategoryRemove = () => {};

  const handleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-[10px] w-[288px] relative">
      <h3 className="font-semibold text-base">{label}</h3>
      <div
        className="w-full h-[44px] rounded-[12px] flex items-center gap-2 overflow-x-hidden overflow-y-hidden text-xs relative border border-[#e4e3eb] px-[10px]"
        onClick={handleOptions}>
        {selectedCategories.map((item) => (
          <Button
            text={item.title}
            key={item.id}
            style={{
              backgroundColor: item.background_color,
              color: item.text_color,
            }}
            className="h-8 py-[6px] px-3 rounded-[30px] text-nowrap cursor-default"
            endDecorator={
              <div
                className="text-white text-xl flex items-center justify-center cursor-pointer"
                onClick={handleCategoryRemove}>
                <IoIosClose />
              </div>
            }
          />
        ))}
        {selectedCategories.length === 0 ? (
          <p className="text-[#85858D] text-sm">{placeholder}</p>
        ) : null}
        <div className="absolute h-full right-0 px-[10px] py-0 bg-white flex items-center justify-center">
          <IoIosArrowDown className="w-6 h-6 cursor-pointer text-sm" />
        </div>
      </div>
      {showOptions && (
        <div className="w-full max-h-[144px] flex flex-wrap gap-2 border border-[#e4e3eb] rounded-[12px] p-[10px] overflow-y-scroll absolute top-20 bg-white">
          {categories.map((item) => (
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
