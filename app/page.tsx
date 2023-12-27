import React from "react";
import Content from "@/components/content";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import { revalidatePath } from "next/cache";

const Page = async () => {
  // const categories = await fetchCategories();

  revalidatePath("/");

  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full px-4">
        <Hero />
        <Content />
      </div>
    </div>
  );
};

export default Page;
