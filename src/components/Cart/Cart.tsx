import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import './Cart.scss';
import { Good } from '../../types/Good';

type Props = {
  onOpenCart: (value: boolean) => void;
};

export const Cart: React.FC<Props> = ({ onOpenCart }) => {
  const { cartItems, setCartItems } = useContext(AppContext);

  const removeFromCart = (id: number) => {
    setCartItems((prev: Good[]) => {
      const updatedCart = prev.filter((item: Good) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart">
      <div className="cart__container">
        {cartItems.length === 0 ? (
          <h3 className="cart__empty">No items in the cart</h3>
        ) : (
          <section className="cart__list">
            {cartItems.map((item, index) => (
              <div key={item.id} className="cart__item">
                <div className="cart__item-image-wrapper">
                  <img
                    src={item.image}
                    alt={`product-${index + 1}`}
                    className="cart__image"
                  />
                </div>

                <div className="cart__item-info-wrapper">
                  <p className="cart__item-text cart__item-title">
                    {item.title}
                  </p>
                  <p className="cart__item-text cart__item-price">
                    &euro;{item.price}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cart__item-text cart__item-delete"
                  >
                    <img
                      title="delete"
                      src={`${process.env.PUBLIC_URL}/icons/icons8-close-50.png`}
                      alt="delete"
                      className="cart__item-delete-img"
                    />
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        <section className="cart__bottom">
          <div className="cart__summary">
            <p className="cart__summary-text">
              Number of products: {cartItems.length}
            </p>
            <p className="cart__summary-text">
              Total price: &euro;{totalPrice}
            </p>
          </div>
        </section>

        <button onClick={() => onOpenCart(false)} className="cart__close">
          <img
            title="close"
            src={`${process.env.PUBLIC_URL}/icons/icons8-close-50.png`}
            alt="close"
            className="cart__close-img"
          />
        </button>
      </div>
    </div>
  );
};
