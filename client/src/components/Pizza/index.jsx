import React, { useState } from 'react';
import Button from '../Button';

const pizzaTypes = ['тонкое', 'традиционное'];

export default function Pizza({ title, price, imageUrl, sizes, types }) {
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  const onSizeClick = (index) => {
    setActiveSizeIndex(index);
  };

  const onTypeClick = (index) => {
    setActiveTypeIndex(index);
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
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
        <Button />
      </div>
    </div>
  );
}
