import { ImageComponentProps } from "@/types";
import { useField } from "formik";
import Image from "next/image";
import React, { useEffect } from "react";

const ImageComponent: React.FC<ImageComponentProps> = ({
  imageTouched,
  handleFileSelect,
  setFieldValue,
  handleImageRemove,
  name,
  hasError,
}) => {
  const [field] = useField(name);

  useEffect(() => {
    sessionStorage.setItem(
      name,
      JSON.stringify({ name: field.value.name, url: field.value.url })
    );
  }, [field.value]);

  const image = field.value.url;

  return (
    <div className="mt-5">
      <label className="font-semibold">ატვირთეთ ფოტო</label>
      {!image ? (
        <div className="relative w-full h-[180px] bg-[#F4F3FF] rounded-lg border-dashed border overflow-hidden mt-4">
          <label htmlFor="image" className="cursor-pointer">
            <input
              hidden
              accept="image/*"
              type="file"
              id="image"
              name="image"
              onChange={(e) => handleFileSelect(e, setFieldValue)}
            />
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center text-center gap-4">
                <Image
                  src="/assets/images/folder-add.png"
                  alt="add img"
                  width={40}
                  height={40}
                  className="cursor-pointer"
                />
                <div className="flex items-center gap-1">
                  <p className="text-sm font-normal">ჩააგდეთ ფაილი აქ ან</p>
                  <label
                    htmlFor="image"
                    className="text-gray-600 text-sm font-semibold underline cursor-pointer">
                    აირჩიეთ ფაილი
                  </label>
                </div>
              </div>
            </div>
          </label>
        </div>
      ) : (
        <>
          <div
            className={`relative w-full h-14 bg-[#F2F2FA] border rounded-lg mt-4 flex justify-between items-center px-4 ${
              imageTouched && hasError
                ? "border-warning bg-warning-background"
                : ""
            }`}>
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/images/gallery.png"
                alt="galery"
                width={24}
                height={24}
              />
              <p>{field.value.name}</p>
            </div>
            <Image
              src="/assets/images/close.png"
              alt="close icon"
              width={24}
              height={24}
              onClick={() => handleImageRemove(setFieldValue)}
              className="cursor-pointer"
            />
          </div>
          {imageTouched && hasError ? (
            <p className="text-warning mt-1">image must be less than 1 mb</p>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default ImageComponent;
