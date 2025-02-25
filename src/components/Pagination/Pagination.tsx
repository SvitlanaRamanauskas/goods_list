import React from "react";
import "./Pagination.scss";

type Props = {
  perPage: number;
  totalGoodsNumber: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  totalGoodsNumber,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalGoodsNumber / perPage);

  const pageNumbers: number[] = Array.from(
    { length: pageCount },
    (_, i) => i + 1
  );

  const handleOpenPrevPage = () =>
    currentPage !== 1 && onPageChange(currentPage - 1);

  const handleOpenNextPage = () =>
    currentPage !== pageCount && onPageChange(currentPage + 1);

  if (pageCount === 1) {
    return null;
  }

  return (
    <ul className="pagination">
      <li
        className={
          currentPage === 1
            ? "pagination__item  pagination__item--disabled"
            : "pagination__item"
        }
      >
        <a
          className="pagination__link"
          href="#prev"
          onClick={handleOpenPrevPage}
          tabIndex={currentPage === 1 ? -1 : 0}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>

      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={
            pageNumber === currentPage
              ? "pagination__item pagination__item--active"
              : "pagination__item"
          }
        >
          <a
            className="pagination__link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li
        className={
          currentPage === pageCount
            ? "pagination__item pagination__item--disabled"
            : "pagination__item"
        }
      >
        <a
          className="pagination__link"
          href="#next"
          onClick={handleOpenNextPage}
          tabIndex={currentPage === pageCount ? -1 : 0}
          aria-disabled={currentPage === pageCount}
        >
          »
        </a>
      </li>
    </ul>
  );
};
