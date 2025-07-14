import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (product) =>
          product.category === category && product.subCategory === subCategory
      );
      setRelatedProducts(filteredProducts.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <section className="my-24" aria-labelledby="related-products-heading">
      <div className="text-center text-3xl py-2">
        <Title text1={"YOU MAY ALSO LIKE"} text2={"RELATED PRODUCTS"} />
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
        role="list"
        aria-label="Related products list"
      >
        {relatedProducts.map((product) => (
          <ProductItem
            key={`${product._id}-${product.name}`}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
