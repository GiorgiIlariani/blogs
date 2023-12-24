import React from "react";
import { ErrorMessage, useField } from "formik";
import { TextField, TextFieldProps } from "@mui/material";
import Image from "next/image";
import { InputProps } from "@/types";

const InputComponent: React.FC<InputProps> = (props) => {
  const { label, name, placeholder, info } = props;

  const [field, meta] = useField(name);

  const hasError = meta.touched && Boolean(meta.error);

  return (
    <>
      <label
        htmlFor={name}
        className={`${
          hasError
            ? "text-[#EA1919]"
            : !hasError && meta.touched
            ? "text-[#14D81C]"
            : ""
        } font-semibold`}>
        {label}
      </label>
      <input
        id={name}
        {...field}
        type="input"
        placeholder={placeholder}
        className="rounded-[12px] mt-[10px] bg-[#FFFFFF] w-full px-4 py-3 border-[2px] focus:border-[#5D37F3] outline-none"
      />
    </>
  );
};

export default InputComponent;
