"use client";

import CreateBlogForm from "@/components/forms/CreateBlog";
import Image from "next/image";
import React, { useLayoutEffect } from "react";
import { redirect } from "next/navigation";

const Page = () => {
  useLayoutEffect(() => {
    const isAuthorized = Boolean(sessionStorage.getItem("isAuthorized"));

    if (!isAuthorized) {
      redirect("/");
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#FBFAFF]">
      <header className="h-20 px-[76px] py-7 bg-[#FFFFFF] flex justify-center items-center">
        <Image
          src="/assets/images/redberry.png"
          alt="redberry logo"
          width={150}
          height={24}
          className="cursor-pointer"
        />
      </header>
      <div className="w-full px-4">
        <div className="max-w-[600px] my-10 mx-auto">
          <h1 className="text-[#1A1A1F] text-[32px] sm:text-[24px] font-bold">
            ბლოგის დამატება
          </h1>
          <CreateBlogForm />
        </div>
      </div>
    </main>
  );
};

export default Page;
