import { Dialog } from "@headlessui/react";
import Image from "next/image";
import React from "react";

type AuthorizationContentProps = {
  value: string;
  isAuthorizationSuccessful?: boolean;
  touched: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
};

const AuthorizationContent: React.FC<AuthorizationContentProps> = ({
  value,
  isAuthorizationSuccessful,
  touched,
  handleChange,
  handleBlur,
}) => {
  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-2xl font-bold leading-6 text-[#1A1A1F] text-center mt-4">
        შესვლა
      </Dialog.Title>
      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-sm mt-4">ელ.ფოსტა</h4>
        <input
          type="text"
          placeholder="Example@redberry.ge"
          className={`rounded-[12px] px-4 py-3 bg-[#F7F7FF] border ${
            touched && !isAuthorizationSuccessful
              ? "border-[#EA1919]"
              : "border-[#5D37F3]"
          } outline-none`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {!isAuthorizationSuccessful && touched ? (
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/warning.png"
              alt="warning"
              width={20}
              height={20}
            />
            <p className="text-[#EA1919] text-sm">ელ-ფოსტა არ მოიძებნა</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AuthorizationContent;
