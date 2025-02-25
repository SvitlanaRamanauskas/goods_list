import React from "react";
import { Good } from "../../types/Good";
import "./GoodCard.scss";

type Props = {
  good: Good,
};

export const GoodCard: React.FC<Props> = ({ good }) => {
  return (
    <div className="card">
      <img src={good.image} alt="product" className="card__image" />
      <p className="card__info card__info--title" >{good.title}</p>
      <p className="card__info card__info--price" >{good.price}</p>
      <p className="card__info card__info--category" >{good.category}</p>

      <div className="card__button-wrapper">
        <button className="card__button" >
          додати до кошика
        </button>
      </div>
    </div>
  )
}