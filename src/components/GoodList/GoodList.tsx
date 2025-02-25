import React from "react";

import { GoodCard } from "../GoodCard/GoodCard";
import { Good } from "../../types/Good";
import './GoodList.scss';



type Props = {
  visibleGoods: Good[],
};

export const GoodList: React.FC<Props> = ({ visibleGoods }) => {
  return (
    <ul className="list">
        {visibleGoods.map(good => (
          <li key={good.id} className="list__item">
            <GoodCard
             good={good} />
          </li>
        ))}

    </ul>
  )
}