import React from "react";

function renderInfo(
  info: string | string[] | undefined,
  hasError: boolean,
  touched: boolean,
  value: string
) {
  const isGeorgianCharacters = /^[ა-ჰ ]+$/.test(value);
  const isAtLeastTwoWords = /\S+\s+\S+/.test(value);

  const renderText = (text: string, className: string = "") => (
    <p className={`text-sm ${className}`}>{text}</p>
  );

  const renderListItem = (text: string, className: string = "") => (
    <li className={`text-sm ${className}`}>{text}</li>
  );

  if (info !== undefined && info !== null) {
    if (typeof info === "string") {
      const textColorClass = hasError
        ? "text-warning"
        : !hasError && value !== ""
        ? "text-success"
        : "";
      return (
        <div className="flex items-center gap-2 mt-1">
          {hasError && (
            <Image
              src="/assets/images/warning.png"
              alt="warning"
              width={20}
              height={20}
              className=""
            />
          )}
          {renderText(info, textColorClass)}
        </div>
      );
    }

    if (Array.isArray(info)) {
      return (
        <ul className="mt-1 list-disc pl-5">
          {renderListItem(
            info[0],
            value.length < 4 && hasError
              ? "text-warning"
              : value.length >= 4
              ? "text-success"
              : ""
          )}
          {renderListItem(
            info[1],
            (!isAtLeastTwoWords && value !== "") || (touched && value === "")
              ? "text-warning"
              : isAtLeastTwoWords
              ? "text-success"
              : ""
          )}
          {renderListItem(
            info[2],
            (!isGeorgianCharacters && value !== "") || (touched && value === "")
              ? "text-warning"
              : isGeorgianCharacters
              ? "text-success"
              : ""
          )}
        </ul>
      );
    }
  }

  return null;
}

import { useField } from "formik";
import Image from "next/image";
import { InputProps } from "@/types";

const InputComponent: React.FC<InputProps> = (props) => {
  const { label, name, placeholder, info } = props;
  const [field, meta] = useField(name);

  const hasError =
    (meta.touched && Boolean(meta.error)) ||
    (field.value.length > 0 && field.value.length < 4);

  const isValidEmail = /^[a-zA-Z\d\.-]+@redberry\.ge$/.test(field.value);

  const hasEmailError =
    (field.value !== "" && !isValidEmail) || (meta.error && meta.touched);

  return (
    <>
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <input
        id={name}
        {...field}
        type="input"
        placeholder={placeholder}
        className={`rounded-[12px] mt-[10px] bg-[#FFFFFF] w-full px-4 py-[10px] border-[2px] focus:border-[#5D37F3] outline-none ${
          hasError
            ? "border border-warning"
            : field.value.length >= 4
            ? "border border-success"
            : ""
        }`}
      />
      <div className="mt-1 text-sm">
        {name === "email" ? (
          <div className="flex items-center gap-2 mt-1">
            {hasEmailError ? (
              <Image
                src="/assets/images/warning.png"
                alt="warning"
                width={20}
                height={20}
                className=""
              />
            ) : null}
            {hasEmailError ? (
              <p
                className={`text-sm ${
                  (field.value !== "" && !isValidEmail) ||
                  (meta.error && meta.touched)
                    ? "text-warning"
                    : isValidEmail
                    ? "text-success"
                    : ""
                }`}>
                {info}
              </p>
            ) : null}
          </div>
        ) : (
          renderInfo(info, hasError, meta.touched, field.value)
        )}
      </div>
    </>
  );
};

export default InputComponent;
