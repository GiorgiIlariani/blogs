import React from "react";
import { useField } from "formik";
import { DatePickerProps } from "@/types";

const DatePickerComponent: React.FC<DatePickerProps> = ({
  name,
  label,
  setFieldValue,
  info,
}) => {
  const [field, meta] = useField(name);

  const hasError = meta.touched && Boolean(meta.error);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setFieldValue) setFieldValue(name, e.target.value);
  };

  return (
    <React.Fragment>
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <input
        className={`${
          hasError
            ? "border border-warning text-warning"
            : field.value !== ""
            ? "border border-success text-success"
            : ""
        } w-full px-4 py-5 text-lg bg-transparent mt-2 rounded-xl bg-[#FFFFFF] h-11 border-[2px] focus:border-[#5D37F3] outline-none`}
        type="date"
        id={name}
        {...field}
        onChange={handleInputChange}
      />
      {info}
    </React.Fragment>
  );
};

export default DatePickerComponent;
