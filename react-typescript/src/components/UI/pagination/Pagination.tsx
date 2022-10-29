import React from 'react';
import { getPagesArray } from 'utils/pagination/getPagesArray';
import './Pagination.scss';

type PropsPagination = {
  totalPages: number;
  page: number;
  handleChangePage: (pageNumber: number) => void;
};

const Pagination = ({ totalPages, page, handleChangePage }: PropsPagination) => {
  const pagesArray = getPagesArray(totalPages);

  return (
    <div className="page-wrapper">
      {pagesArray.map((pageNumber) => (
        <span
          onClick={() => handleChangePage(pageNumber)}
          className={page === pageNumber ? 'page page-current' : 'page'}
          key={pageNumber}
        >
          {pageNumber}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
