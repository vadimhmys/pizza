import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Sort from '../components/Sort';
import PizzaLoader from '../components/Pizza/PizzaLoader';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

export default function Home() {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [elementCount, setElementCount] = useState(0);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-','',);
    const order = sort.sortProperty.includes('-') ? 'ASC' : 'DESC';

    axios
      .get(
        `http://localhost:7000/api/pizza/getall?category=${categoryId}&sortBy=${sortBy}&order=${order}&limit=4&page=${currentPage}`,
      )
      .then((res) => {
        setItems(res.data.rows);
        setElementCount(res.data.count);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, currentPage]);

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
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination
          onChangePage={onChangePage}
          elementCount={elementCount}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
