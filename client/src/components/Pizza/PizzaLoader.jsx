import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaLoader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={350}
    height={466}
    viewBox="0 0 350 590"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="165" cy="153" r="150" />
    <rect x="19" y="331" rx="10" ry="10" width="295" height="46" />
    <rect x="0" y="391" rx="6" ry="6" width="346" height="109" />
    <rect x="0" y="528" rx="8" ry="8" width="124" height="60" />
    <rect x="67" y="568" rx="0" ry="0" width="0" height="1" />
    <rect x="157" y="525" rx="23" ry="23" width="190" height="56" />
    <rect x="247" y="541" rx="0" ry="0" width="1" height="3" />
  </ContentLoader>
);

export default PizzaLoader;
