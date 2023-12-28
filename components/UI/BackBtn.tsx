"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const BackBtn = ({ backFromFormPage }: { backFromFormPage?: boolean }) => {
  const router = useRouter();

  const handleClick = () => {
    if (backFromFormPage && typeof window !== "undefined") {
      sessionStorage.clear();
      sessionStorage.setItem("isAuthorized", "true");
      router.push("/");
    }
    router.push("/");
  };

  return (
    <button
      className={`w-11 heroSection:w-8 h-11 heroSection:h-8 bg-[#E4E3EB] absolute top-[120px] ${
        !backFromFormPage
          ? "heroSection:top-[105px] heroSection:left-6 "
          : "heroSection:left-4"
      }  ${
        backFromFormPage ? "heroSection:top-[24px]" : ""
      } left-[76px] lg:left-[50px]  flex items-center justify-center rounded-[24px]`}
      onClick={handleClick}>
      <IoIosArrowBack />
    </button>
  );
};

export default BackBtn;
