import { useCallback } from "react";
import { generateRange } from "../utils/heplers";

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useCallback(() => {
    const pageSize = 10;
    const paginationCount = Math.ceil(totalProductCount / pageSize);
    const totalPaginationItem = siblingCount * 2 + 3;

    if (paginationCount <= totalPaginationItem) {
      return generateRange(1, paginationCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, paginationCount);

    let paginationArray = [];
    if (currentPage > siblingCount + 1) {
      paginationArray = [...paginationArray, 1, "..."];
    }

    paginationArray = [...paginationArray, ...generateRange(leftSiblingIndex, rightSiblingIndex)];

    if (currentPage < paginationCount - siblingCount) {
      paginationArray = [...paginationArray, "...", paginationCount];
    }

    return paginationArray;
  }, [totalProductCount, currentPage, siblingCount]);

  return paginationArray();
};

export default usePagination;
