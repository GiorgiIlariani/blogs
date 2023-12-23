import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

interface UseSmoothHorizontalScroll {
  scrollContainerRef: RefObject<HTMLElement>;
  handleScroll: () => void;
  scrollTo: (shift: number) => void;
  isAtStart: boolean;
  isAtEnd: boolean;
}

const useSmoothHorizontalScroll = (): UseSmoothHorizontalScroll => {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    setIsAtEnd(
      scrollContainerRef.current.scrollWidth === scrollContainerRef.current.offsetWidth
    );
  }, [scrollContainerRef]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    setIsAtStart(scrollContainerRef.current?.scrollLeft === 0);
    setIsAtEnd(
      Math.floor(
        scrollContainerRef.current?.scrollWidth -
        scrollContainerRef.current?.scrollLeft
      ) <= scrollContainerRef.current?.offsetWidth
    );
  };


  const scrollTo = (shift: number) => {
    scrollContainerRef.current?.scrollTo({
      left: scrollContainerRef.current?.scrollLeft + shift,
      behavior: "smooth",
    });
  };

  return {
    scrollContainerRef,
    handleScroll,
    scrollTo,
    isAtStart,
    isAtEnd
  };
};

export default useSmoothHorizontalScroll;