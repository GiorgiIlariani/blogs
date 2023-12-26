import Image from "next/image";
import React from "react";

const SuccessContent = () => {
  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <Image
        src="/assets/images/tick-circle.png"
        alt="tick circle"
        width={64}
        height={64}
      />
      <h3 className="font-bold text-xl text-[#1A1A1F] mb-4 text-center">
        წარმატებული ავტორიზაცია
      </h3>
    </div>
  );
};

export default SuccessContent;
