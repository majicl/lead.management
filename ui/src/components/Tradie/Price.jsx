import './Price.css';

const Price = ({ price, label }) => {
  return (
    <span className="price-container">
      <strong>{price}</strong> {label}
    </span>
  );
};

export default Price;
