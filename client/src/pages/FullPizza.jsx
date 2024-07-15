import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function FullPizza() {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`http://localhost:7000/api/pizza/getone/` + id);
        setPizza(data);
      } catch (error) {
        console.log('ERROR: ', error.message);
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} руб.</h4>
    </div>
  );
}
