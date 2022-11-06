import classNames from 'classnames';
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
  let sliceLeft;
  let sliceRight;

  if (pagesArray.length > 5) {
    if (page === 1) {
      sliceLeft = page;
      sliceRight = page + 3;
    } else if (page === 2) {
      sliceLeft = page - 1;
      sliceRight = page + 2;
    } else if (page > 1 && page < pagesArray.length - 1) {
      sliceLeft = page - 2;
      sliceRight = page + 1;
    } else if (page === pagesArray.length - 1) {
      sliceLeft = page - 3;
      sliceRight = page;
    } else {
      sliceLeft = page - 4;
      sliceRight = page - 1;
    }
  } else {
    sliceLeft = 1;
    sliceRight = pagesArray.length - 1;
  }

  const leftButtonClass = classNames({
    page: true,
    'page-disable': page === 1,
    'page-hidden': pagesArray.length === 0,
  });

  const rightButtonClass = classNames({
    page: true,
    'page-disable': page === pagesArray.length,
    'page-hidden': pagesArray.length === 0,
  });

  const leftDotsClass = classNames({
    page: true,
    'page-hidden': pagesArray.length < 6 || (page > 0 && page < 4),
    'page-disable-dots': pagesArray.length > 5 || page > 3,
  });

  const rightDotsClass = classNames({
    page: true,
    'page-hidden':
      pagesArray.length < 6 || (page > pagesArray.length - 3 && page <= pagesArray.length),
    'page-disable-dots': pagesArray.length > 5 || page < pagesArray.length - 2,
  });

  return (
    <div className="page-wrapper">
      <span
        className={leftButtonClass}
        onClick={page > 1 ? () => handleChangePage(page - 1) : () => {}}
      >
        &#60;
      </span>
      {pagesArray.slice(0, 1).map((pageNumber) => (
        <span
          onClick={() => handleChangePage(pageNumber)}
          className={page === pageNumber ? 'page page-current' : 'page'}
          key={pageNumber}
        >
          {pageNumber}
        </span>
      ))}
      <span className={leftDotsClass}>...</span>
      {pagesArray.slice(sliceLeft, sliceRight).map((pageNumber) => (
        <span
          onClick={() => handleChangePage(pageNumber)}
          className={page === pageNumber ? 'page page-current' : 'page'}
          key={pageNumber}
        >
          {pageNumber}
        </span>
      ))}
      <span className={rightDotsClass}>...</span>
      {pagesArray.length !== 1 &&
        pagesArray.slice(-1).map((pageNumber) => (
          <span
            onClick={() => handleChangePage(pageNumber)}
            className={page === pageNumber ? 'page page-current' : 'page'}
            key={pageNumber}
          >
            {pageNumber}
          </span>
        ))}
      <span
        className={rightButtonClass}
        onClick={page < pagesArray.length ? () => handleChangePage(page + 1) : () => {}}
      >
        &#62;
      </span>
    </div>
  );
};

export default Pagination;
