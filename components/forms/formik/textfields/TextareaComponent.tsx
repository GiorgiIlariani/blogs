import React, { useEffect } from "react";
import { useField } from "formik";

const TextareaComponent = (props: any) => {
  const { label, name, placeholder, minRows, info } = props;

  const [field, meta] = useField(name);

  const hasError =
    (meta.touched && Boolean(meta.error)) ||
    (field.value.trim().length > 0 && field.value.trim().length < 2);

  useEffect(() => {
    sessionStorage.setItem(name, field.value.trim());
  }, [field.value, name]);

  return (
    <>
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <textarea
        rows={minRows}
        {...field}
        placeholder={placeholder}
        className={`w-full min-h-[150px] mt-[10px] border-[#FAF2F3] p-[10px] rounded-[12px] border-[2px] focus:border-[#5D37F3] outline-none resize-none ${
          hasError
            ? "border border-warning bg-warning-background"
            : field.value.trim().length >= 2
            ? "border border-success"
            : ""
        }`}
      />
      <p
        className={`mt-1 text-sm ${
          hasError
            ? "text-warning"
            : field.value.trim().length >= 2
            ? "text-success"
            : ""
        }`}>
        {info}
      </p>
    </>
  );
};

export default TextareaComponent;
