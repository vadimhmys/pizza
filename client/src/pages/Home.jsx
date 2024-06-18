import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Sort from '../components/Sort';
import PizzaLoader from '../components/Pizza/PizzaLoader';

export default function Home() {
  const [categoryId, setCategoryId] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:7000/api/pizza/getall?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
        sortType.sortProperty.includes('-') ? 'ASC' : 'DESC'
      }`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
          <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <PizzaLoader key={index} />)
            : items.map((i) => (
                <Pizza
                  key={i.id}
                  title={i.title}
                  price={i.price}
                  imageUrl={i.imageUrl}
                  sizes={i.sizes}
                  types={i.types}
                />
              ))}
        </div>
      </div>
    </>
  );
}
