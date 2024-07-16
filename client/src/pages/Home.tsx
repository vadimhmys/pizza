import React from 'react';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Pizza from '../components/Pizza';
import Sort, { list } from '../components/Sort';
import PizzaLoader from '../components/Pizza/PizzaLoader';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, count, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = React.useCallback(
    (idx: number) => {
      dispatch(setCategoryId(idx));
    },
    [dispatch],
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = React.useCallback(
    async (ignore: boolean) => {
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'ASC' : 'DESC';

      if (!ignore) {
        dispatch(
          // @ts-ignore
          fetchPizzas({
            sortBy,
            order,
            categoryId,
            currentPage,
          }),
        );
      }
    },
    [categoryId, sort.sortProperty, currentPage, dispatch],
  );

  React.useEffect(() => {
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

  React.useEffect(() => {
    let ignore = false;
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas(ignore);
    }

    isSearch.current = false;

    return () => {
      ignore = true;
    };
  }, [categoryId, sort.sortProperty, currentPage, getPizzas]);

  React.useEffect(() => {
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
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((i: any) => (
      <Link key={i.id} to={`/pizza/${i.id}`}>
        <Pizza
          id={i.id}
          title={i.title}
          price={i.price}
          imageUrl={i.imageUrl}
          sizes={i.sizes}
          types={i.types}
        />
      </Link>
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
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        )}
        <Pagination onChangePage={onChangePage} elementCount={count} currentPage={currentPage} />
      </div>
    </>
  );
}

export default Home;