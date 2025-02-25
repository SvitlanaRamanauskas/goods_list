import React from "react";
import "./SelectPerPageNumber.scss";

const itemsPerPageOptions = [3, 5, 10, 20];

type Props = {
  onPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  perPage: number;
};

export const SelectPerPageNumber: React.FC<Props> = ({ 
  onPerPageChange,
  perPage,
 }) => {
  return (
    <>
      <div className="select">
        <select
          id="perPageSelector"
          className="select__window"
          value={perPage}
          onChange={onPerPageChange}
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option} className="select__option">
              {option}
            </option>
          ))}
        </select>
      </div>

      <label htmlFor="perPageSelector" className="select__label">
        items per page
      </label>
    </>
  );
};
