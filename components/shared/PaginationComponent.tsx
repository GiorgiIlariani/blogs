"use client";

import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import { usePagination } from "@/hooks/usePagination";

interface Props {
  pageNumber: number;
  isNext: boolean;
  path: string;
  totalCounts: number;
}

function PaginationComponent({ pageNumber, isNext, path, totalCounts }: Props) {
  const router = useRouter();

  const pagination = usePagination({
    totalCount: totalCounts,
    siblingCount: 1,
    pageSize: 6,
    currentPage: pageNumber,
  });

  const handleNavigation = (type: string, number?: number) => {
    let nextPageNumber = pageNumber;

    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    } else if (type === "button") {
      nextPageNumber = number || 1;
    }

    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };

  return (
    <div className="flex w-full items-center justify-center gap-1 xs:gap-[3px]">
      <Button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className="text-light-1 cursor-pointer border border-[#5D37F3] min-w-[40px] py-[7px] bg-[#5D37F3] rounded-[4px] px-3 xs:px-[6px] xs:text-sm"
        text="Prev"
      />

      {pagination.map((page, index) => {
        if (page === "...")
          return (
            <div className="mx-1" key={index}>
              <p className=" text-[#5D37F3] font-bold text-xl">...</p>
            </div>
          );
        return (
          <Button
            key={index}
            text={String(page)}
            type="button"
            className="text-light-1 cursor-pointer border min-w-[40px] py-[7px] xs:py-[5px] rounded-[4px] px-3 xs:px-[6px] bg-gray-400 "
            onClick={() => handleNavigation("button", page)}
            style={{
              backgroundColor: page === pageNumber ? "#5D37F3" : "",
              borderColor: page === pageNumber ? "#5D37F3" : "",
            }}
          />
        );
      })}
      <Button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="text-light-1 cursor-pointer border border-[#5D37F3] min-w-[40px] py-[7px] bg-[#5D37F3] rounded-[4px] px-3 xs:px-[6px] xs:text-sm"
        text="Next"
      />
    </div>
  );
}

export default PaginationComponent;
