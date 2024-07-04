import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Sort, { list } from '../components/Sort';
import PizzaLoader from '../components/Pizza/PizzaLoader';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [elementCount, setElementCount] = useState(0);

  const onChangeCategory = React.useCallback(
    (id) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = React.useCallback(
    (ignore) => {
      setIsLoading(true);

      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'ASC' : 'DESC';

      axios
        .get(
          `http://localhost:7000/api/pizza/getall?category=${categoryId}&sortBy=${sortBy}&order=${order}&limit=4&page=${currentPage}`,
        )
        .then((res) => {
          if (!ignore) {
            setItems(res.data.rows);
            setElementCount(res.data.count);
            setIsLoading(false);
          }
        });
    },
    [categoryId, sort.sortProperty, currentPage],
  );

  useEffect(() => {
    if (
      window.location.search &&
      window.location.search !== '?sortBy=rating&category=0&currentPage=1'
    ) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          categoryId: params.category,
          currentPage: params.currentPage,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    let ignore = false;
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas(ignore);
    }

    isSearch.current = false;

    return () => {
      ignore = true;
    };
  }, [categoryId, sort.sortProperty, currentPage, fetchPizzas]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortProperty,
        category: categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

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
