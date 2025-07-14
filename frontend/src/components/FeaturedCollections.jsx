import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const FeaturedCollections = () => {
  const { products } = useContext(ShopContext);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const newestProducts = products?.slice(0, 10);
    setNewArrivals(newestProducts);
  }, [products]);

  return (
    <section className="my-10" aria-labelledby="latest-collections-heading">
      <div className="text-center py-8 text-3xl">
        <Title text1={"FEATURED"} text2={"COLLECTIONS"} />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest additions - fresh styles just arrived
        </p>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
        role="list"
        aria-label="Latest products"
      >
        {newArrivals?.map((product) => (
          <ProductItem
            key={`${product._id}-${product.name}`}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;
