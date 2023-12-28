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
    <div className="pagination">
      <Button
        text="Prev"
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className="text-light-2 cursor-pointer border border-[#0f1724]  min-w-[40px] py-[10px] bg-transparent rounded-[4px]"
      />
      {pagination.map((page, index) => {
        if (page === "...")
          return (
            <div className="mx-1">
              <p className=" text-light-1 font-semibold">...</p>
            </div>
          );
        return (
          <Button
            key={page}
            text={String(page)}
            type="button"
            className={`text-light-2 cursor-pointer border border-[#0f1724] min-w-[40px] py-[10px] rounded-[4px] ${
              page === pageNumber && "bg-[#ffffff29]"
            }`}
            onClick={() => handleNavigation("button", page)}
          />
        );
      })}
      <Button
        text="Next"
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="text-light-2 cursor-pointer border border-[#0f1724] min-w-[40px] py-[10px] bg-transparent rounded-[4px]"
      />
    </div>
  );
}

export default PaginationComponent;
