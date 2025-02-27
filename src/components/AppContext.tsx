import React, { useEffect, useMemo, useState } from 'react';
import { Good } from '../types/Good';

type ContextType = {
  cartItems: Good[];
  setCartItems: React.Dispatch<React.SetStateAction<Good[]>>;
};

type Props = {
  children: React.ReactNode;
};
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const AppContext = React.createContext<ContextType>({
  cartItems: [],
  setCartItems: () => {},
});

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Good[]>(() => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const values = useMemo(
    () => ({
      cartItems,
      setCartItems,
    }),
    [cartItems, setCartItems],
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
