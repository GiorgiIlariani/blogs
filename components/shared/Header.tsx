"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../UI/Button";
import Modal from "./modal";

const Header = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthorizationSuccessful, setIsAuthorizationSuccessful] =
    useState(false);

  const handleAddBlog = () => {
    router.push("/addBlog");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          type="button"
          text="დაამატე ბლოგი"
          className="bg-[#5D37F3] text-light-1"
          onClick={handleAddBlog}
        />
      ) : (
        <Button
          type="button"
          text="შესვლა"
          onClick={openModal}
          className="bg-[#5D37F3] text-light-1"
          //   style={{ backgroundColor: "#5D37F3", color: "#FFFFFF" }}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        isAuthorizationSuccessful={isAuthorizationSuccessful}
        setIsAuthorizationSuccessful={setIsAuthorizationSuccessful}
      />
    </div>
  );
};

export default Header;

{
  /*   
      

 */
}
