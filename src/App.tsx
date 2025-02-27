import React, { useCallback, useContext, useEffect, useState } from 'react';
import './App.scss';
import { getGoods } from './helper/fetch';
import { Good } from './types/Good';
import { GoodList } from './components/GoodList/GoodList';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select';
import { Loader } from './components/Loader';
import { Cart } from './components/Cart';
import { AppContext } from './components/AppContext';

const itemsPerPageOptions = ['6', '12', '18'];

enum Categories {
  All = 'All',
}

function App() {
  const [goods, setGoods] = useState<Good[]>([]);
  const [loadingGoods, setLoadingGoods] = useState(false);
  const [errorGettingGoods, setErrorGettingGoods] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [byCategory, setByCategory] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useContext(AppContext);

  useEffect(() => {
    setErrorGettingGoods(false);
    setLoadingGoods(true);
    getGoods()
      .then((data) => setGoods(data))
      .catch(() => setErrorGettingGoods(true))
      .finally(() => setLoadingGoods(false));
  }, [perPage]);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const filteredGoods =
    byCategory === '' || byCategory === 'All'
      ? goods
      : goods.filter((good) => good.category === byCategory);

  const displayedGoods = filteredGoods.slice(startIndex, endIndex);

  const categoriesList = [
    Categories.All,
    ...new Set(goods.map((good) => good.category)),
  ];

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        setCurrentPage(page);
      }
    },
    [currentPage],
  );

  const handleFilterByCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setByCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const number = parseInt(e.target.value, 10);

    setPerPage(number);
    setCurrentPage(1);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">List of goods</h1>
        <button
          className="header__cart-button"
          onClick={() => setIsCartOpen(true)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons/icons8-cart-50.png`}
            alt=""
            className="header__cart"
          />
          {!!cartItems.length && (
            <div className="header__cart-circle">{cartItems.length}</div>
          )}
        </button>
      </header>

      {isCartOpen && <Cart onOpenCart={setIsCartOpen} />}

      <main className="main">
        <section className="main__section main__section--select">
          <Select
            onSelectChange={handlePerPageChange}
            items={itemsPerPageOptions}
            selectValue={String(perPage)}
            labelName="Items per page"
          />
        </section>

        <section className="main__section">
          <Select
            onSelectChange={handleFilterByCategory}
            items={categoriesList}
            selectValue={byCategory}
            labelName="Filter by category"
          />
        </section>

        {loadingGoods && !errorGettingGoods && <Loader />}

        {!loadingGoods && errorGettingGoods && <h3>Error loading products</h3>}

        {!loadingGoods && !errorGettingGoods && (
          <section className="main__section">
            <GoodList visibleGoods={displayedGoods} />
          </section>
        )}

        <section className="main__section">
          <Pagination
            perPage={perPage}
            totalGoodsNumber={filteredGoods.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </section>
      </main>

      <footer className="footer">
        <p className="footer__rights">©Copyright 2025. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
