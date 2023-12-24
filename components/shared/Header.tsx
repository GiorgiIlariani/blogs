"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../UI/Button";
import Modal from "./modal";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthorizationSuccessful, setIsAuthorizationSuccessful] = useState(
    Boolean(
      typeof window !== "undefined" && sessionStorage.getItem("isAuthorized")
    ) || false
  );

  const handleAddBlog = () => router.push("/addBlog");

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    typeof window !== "undefined" && sessionStorage.removeItem("isAuthorized");
    setIsAuthorizationSuccessful(false);
  };

  return (
    <div className="w-full h-20 px-14 sm:px-3 py-7 flex justify-between items-center bg-[#FFFFFF]">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/assets/images/redberry.png"
          alt="redberry logo"
          width={150}
          height={24}
          className="w-[150px] h-[24px] xs:w-[120px] xs:h-[20px]"
        />
      </Link>
      {isAuthorizationSuccessful ? (
        <div className="flex gap-2 xs:gap-4 items-center">
          <Button
            type="button"
            text="დაამატე ბლოგი"
            className="bg-[#5D37F3] text-light-1 xs:text-sm"
            onClick={handleAddBlog}
          />
          <Button
            type="button"
            text="გამოსვლა"
            className="bg-[#FFFFFF] text-[#5D37F3] border border-[#5D37F3] xs:hidden"
            onClick={handleLogout}
          />
          <div
            className="cursor-pointer object-contain xs:block hidden"
            onClick={handleLogout}>
            <LogoutIcon />
          </div>
        </div>
      ) : (
        <Button
          type="button"
          text="შესვლა"
          onClick={openModal}
          className="bg-[#5D37F3] text-light-1"
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
