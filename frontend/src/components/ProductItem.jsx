import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <article className="product-item">
      <Link
        to={`/product/${id}`}
        className="text-gray-700 cursor-pointer"
        aria-label={`View ${name} product details`}
      >
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition-transform duration-300 ease-in-out"
            src={image[0]}
            alt={`${name} product`}
            loading="lazy"
          />
        </div>
        <h3 className="pt-3 pb-1 text-sm">{name}</h3>
        <p
          className="text-sm font-medium"
          aria-label={`Price: ${currency}${price}`}
        >
          {currency}
          {price.toFixed(2)}
        </p>
      </Link>
    </article>
  );
};

export default ProductItem;
