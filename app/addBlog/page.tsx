"use client";

import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

const Page = () => {
  useLayoutEffect(() => {
    const isAuth =
      typeof window !== "undefined" &&
      Boolean(sessionStorage.getItem("isAuthorized"));

    if (!isAuth) {
      redirect("/");
    }
  }, []);

  return <div>Page</div>;
};

export default Page;
