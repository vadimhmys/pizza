import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Sort from '../components/Sort';
import PizzaLoader from '../components/Pizza/PizzaLoader';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

export default function Home() {
  const { searchValue } = React.useContext(SearchContext );
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [elementCount, setElementCount] = useState(0);

  const onChangeCategory = (id) => {
    setCategoryId(id);
    setCurrentPage(1);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:7000/api/pizza/getall?category=${categoryId
      }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
        sortType.sortProperty.includes('-') ? 'ASC' : 'DESC'
      }&limit=4&page=${currentPage}`,
    )
      .then((res) => res.json())
      .then((obj) => {
        setItems(obj.rows);
        setElementCount(obj.count);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((i) => (
      <Pizza
        key={i.id}
        title={i.title}
        price={i.price}
        imageUrl={i.imageUrl}
        sizes={i.sizes}
        types={i.types}
      />
    ));

  const skeletons = [...new Array(6)].map((_, index) => <PizzaLoader key={index} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination onChangePage={(number) => setCurrentPage(number)} elementCount={elementCount} currentPage={currentPage}/>
      </div>
    </>
  );
}
