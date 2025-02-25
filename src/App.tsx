import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import { getGoods } from "./helper/fetch";
import { Good } from "./types/Good";
import { GoodList } from "./components/GoodList/GoodList";
import { Pagination } from "./components/Pagination";
import { SelectPerPageNumber } from "./components/SelectPerPageNumber";
import { Loader } from "./components/Loader";

function App() {
  const [goods, setGoods] = useState<Good[]>([]);
  const [loadingGoods, setLoadingGoods] = useState(false);
  const [errorGettingGoods, setErrorGettingGoods] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    setErrorGettingGoods(false)
    setLoadingGoods(true);
    getGoods()
      .then((data) => setGoods(data))
      .catch(() => setErrorGettingGoods(true))
      .finally(() => {
        setTimeout(() => {
          setLoadingGoods(false);
        }, 1000);
      });
  }, [perPage]);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedGoods = goods.slice(startIndex, endIndex);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        setCurrentPage(page);
      }
    },
    [currentPage]
  );

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const number = parseInt(e.target.value, 10);

    setPerPage(number);
    setCurrentPage(1);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">List of goods</h1>
      </header>

      <main className="main">
        <section className="main__section main__section--select">
          <SelectPerPageNumber
            onPerPageChange={handlePerPageChange}
            perPage={perPage}
          />
        </section>

        {loadingGoods && !errorGettingGoods && 
        <Loader />}

        {!loadingGoods && errorGettingGoods && 
        <h3>Помилка завантаження товарів</h3>}

        {!loadingGoods && !errorGettingGoods && (
          <section className="main__section">
            <GoodList visibleGoods={displayedGoods} />
          </section>
        )}

        <section className="main__section">
          <Pagination
            perPage={perPage}
            totalGoodsNumber={goods.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
