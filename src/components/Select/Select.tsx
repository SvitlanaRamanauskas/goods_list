import React from "react";
import "./Select.scss";

type Props = {
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  items: string[];
  selectValue: string;
  labelName: string;
};

export const Select: React.FC<Props> = ({
  onSelectChange,
  items,
  selectValue,
  labelName,
}) => {
  return (
    <>
      <div className="select">
        <label className="select__label">
          <select
            className="select__window"
            value={selectValue}
            onChange={onSelectChange}
          >
            {items.map((option) => (
              <option key={option} value={option} className="select__option">
                {option}
              </option>
            ))}
          </select>

          {labelName}
        </label>
      </div>
    </>
  );
};
