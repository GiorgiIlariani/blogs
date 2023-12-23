"use client";

import Image from "next/image";
// import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../UI/Button";

const Header = () => {
  const router = useRouter();
  const [isAuthorizationSuccessful, setIsAuthorizationSuccessful] =
    useState(false);

  const handleAddBlog = () => {
    router.push("/addBlog");
  };

  return (
    <div className="w-full h-20 px-[76px] py-7 flex justify-between items-center bg-[#FFFFFF]">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/assets/images/redberry.png"
          alt="redberry logo"
          width={150}
          height={24}
        />
      </Link>
      {isAuthorizationSuccessful ? (
        <Button
          text="დაამატე ბლოგი"
          style={{ backgroundColor: "#5D37F3", color: "#FFFFFF" }}
          onClick={handleAddBlog}
        />
      ) : (
        <Button
          text="შესვლა"
          //   onClick={openModal}
          style={{ backgroundColor: "#5D37F3", color: "#FFFFFF" }}
        />
      )}
    </div>
  );
};

export default Header;
