import React from 'react';

export default function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((c, i) => (
          <li key={i} className={activeIndex === i ? 'active' : ''} onClick={() => handleClick(i)}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
