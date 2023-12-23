import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="max-w-[1262px] mx-auto py-16 flex justify-between items-center heroSection:flex-col heroSection:gap-8">
      <h1 className="font-bold text-[64px] sm:text-5xl">ბლოგი</h1>
      <Image
        src="/assets/images/hero.png"
        alt="hero image"
        width={624}
        height={200}
        priority
      />
    </div>
  );
};

export default Hero;
