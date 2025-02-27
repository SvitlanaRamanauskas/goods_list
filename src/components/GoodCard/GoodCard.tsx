import React, { useContext } from 'react';
import cn from 'classnames';
import { Good } from '../../types/Good';
import './GoodCard.scss';
import { AppContext } from '../AppContext';

type Props = {
  good: Good;
};

export const GoodCard: React.FC<Props> = ({ good }) => {
  const { cartItems, setCartItems } = useContext(AppContext);

  const addToCart = (good: Good) => {
    setCartItems((prev) => [...prev, good]);
  };

  const isInCart = (good: Good) => {
    return cartItems.some((item) => item.id === good.id);
  };

  return (
    <div className="card">
      <img src={good.image} alt="product" className="card__image" />
      <p className="card__info card__info--title">{good.title}</p>
      <p className="card__info card__info--price">&euro;{good.price}</p>
      <p className="card__info card__info--category">{good.category}</p>

      <div className="card__button-wrapper">
        <button
          className={cn('card__button', {
            'card__button card__button--chosen': isInCart(good),
          })}
          onClick={() => addToCart(good)}
        >
          {isInCart(good) ? 'added to cart' : 'add to cart'}
        </button>
      </div>
    </div>
  );
};
