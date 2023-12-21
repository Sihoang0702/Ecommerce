import React, { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { createSearchParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";
const Pagination = ({ totalProduct, pageSize = 10 }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(() => Math.ceil(totalProduct / pageSize), [totalProduct, pageSize]);
  const handlePageChange = (selected) => {
    const queries = Object.fromEntries([...params]);
    if (selected) {
      queries.page = selected.selected + 1;
    }
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
    setCurrentPage(selected.selected);
  };

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage, navigate]);

  return (
    <div className="flex">
      <ReactPaginate
        nextLabel="next"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
