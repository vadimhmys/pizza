import { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import Pizza from './components/Pizza';
import Sort from './components/Sort';
import './scss/app.scss';
import PizzaLoader from './components/Pizza/PizzaLoader';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:7000/api/pizza/getall')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
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
        </div>
      </div>
    </div>
  );
}

export default App;
