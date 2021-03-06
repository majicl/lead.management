import React from 'react';
import "./price.css";

const Price = ({ price, label }) => (
  <span className="price-container">
    <strong>{price}</strong> {label}
  </span>
);

export default Price;
