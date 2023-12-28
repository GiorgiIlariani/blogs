import { range } from "@/utils";
import { useMemo } from "react";

type PaginationRange = (number | '...')[];

interface UsePaginationOptions {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount, // ანუ სულ რამდენი დოკუმენტია
  pageSize, // ერთ გვერდზე რამდენი დოკუმენტი უნდა დაეტიოს
  siblingCount = 1, // რა გვერდზეც ხარ მაგის გარშემო რამდენი ბუთონი უნდა იყოს მააგლითად 15 ხარ ...14,15,16...
  currentPage, // რომელ გვერდზეც ხარ იმას აჩვენებს
}: UsePaginationOptions): PaginationRange => {
  const paginationRange = useMemo<PaginationRange>(() => {

    //  სუ რამდენი გვერდი უნდა იყოს ამას აჩვენებს
    const totalPageCount = Math.ceil(totalCount / pageSize);
    

    // ფეიჯინეიშენზე რამდენი გვერდი უნდა ვაჩვენოთ(6)
    const totalPageNumbers = siblingCount + 5; //  ჩვენ შემთხვევაში სულ 6ია(თვითონ რომელ გვერდზეც არის, ძმები, 2 წერტილი, პირველი და მეორე)

    
    // თუ ფეიჯინეიშენზე რამდენი გვერდიც უნდა აჩვენო მეტია ან ტოლია გვერდების რაოდენობაზე
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      console.log('1. this if statement is shown');
        
      return [...leftRange, '...', lastPageIndex];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
       console.log('2. this if statement is shown');
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
       console.log('3. this if statement is shown');
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};