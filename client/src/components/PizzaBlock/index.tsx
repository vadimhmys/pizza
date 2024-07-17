import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, selectCartItemById } from '../../redux/slices/cartSlice';
import Button from '../Button';
import type { CartItem } from '../../redux/slices/cartSlice';


const pizzaTypes = ['тонкое', 'традиционное'];

type PizzaProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const Pizza: React.FC<PizzaProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const addedCount = cartItem ? cartItem.count : 0;
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: pizzaTypes[activeTypeIndex],
      size: sizes[activeSizeIndex],
      count: 0,
    };
    dispatch(addItem(item));
  };

  const onSizeClick = (index: number) => {
    setActiveSizeIndex(index);
  };

  const onTypeClick = (index: number) => {
    setActiveTypeIndex(index);
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((t, index) => (
              <li
                key={t}
                className={index === activeTypeIndex ? 'active' : ''}
                onClick={() => onTypeClick(index)}>
                {pizzaTypes[t]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((s, index) => (
              <li
                key={s}
                className={index === activeSizeIndex ? 'active' : ''}
                onClick={() => onSizeClick(index)}>
                {s} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <Button onClickAdd={onClickAdd} addedCount={addedCount} />
        </div>
      </div>
    </div>
  );
};

export default Pizza;
