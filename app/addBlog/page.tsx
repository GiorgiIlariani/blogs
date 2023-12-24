// "use client";

import CreateBlogForm from "@/components/forms/CreateBlog";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import Image from "next/image";
// import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const categories = await fetchCategories();
  // useLayoutEffect(() => {
  //   const isAuth =
  //     typeof window !== "undefined" &&
  //     Boolean(sessionStorage.getItem("isAuthorized"));

  //   if (!isAuth) {
  //     redirect("/");
  //   }
  // }, []);

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
      <div className="max-w-[600px] my-10 mx-auto">
        <h1 className="text-[#1A1A1F] text-[32px] font-bold mx-4">
          ბლოგის დამატება
        </h1>
        <div className="mx-4">
          <CreateBlogForm categories={categories} />
        </div>
      </div>
    </main>
  );
};

export default Page;
