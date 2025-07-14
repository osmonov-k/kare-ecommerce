import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  // Sample review data
  const [reviews] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      date: "2023-10-15",
      comment:
        "Excellent product quality and fast delivery. Very satisfied with my purchase!",
    },
    {
      id: 2,
      name: "Sarah Miller",
      rating: 4,
      date: "2023-09-28",
      comment:
        "Good product but the sizing runs a bit small. Otherwise great quality.",
    },
    {
      id: 3,
      name: "Michael Chen",
      rating: 5,
      date: "2023-08-10",
      comment: "Absolutely love it! Worth every penny. Will buy again.",
    },
  ]);

  // Product description data
  const productDescription = {
    overview:
      "Premium quality product designed for comfort and durability. Made with high-grade materials that ensure long-lasting performance.",
    features: [
      "100% premium materials",
      "Ergonomic design for maximum comfort",
      "Easy to clean and maintain",
      "Available in multiple sizes and colors",
    ],
    specifications: {
      material: "High-grade synthetic fabric",
      weight: "450g",
      dimensions: "Varies by size",
      care: "Machine wash cold, tumble dry low",
    },
  };

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  if (!product) {
    return <div className="opacity-0" aria-hidden="true"></div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/** Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%]">
            {product.image.map((item, index) => (
              <img
                onClick={() => setSelectedImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  selectedImage === item ? "ring-2 ring-orange-500" : ""
                }`}
                alt={`Product thumbnail ${index + 1}`}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={selectedImage}
              alt={product.name}
              loading="lazy"
            />
          </div>
        </div>

        {/** Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122 reviews)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size, index) => (
                <button
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 px-4 bg-gray-100 hover:bg-gray-200 transition-colors ${
                    size === selectedSize ? "border-orange-500 border-2" : ""
                  }`}
                  key={index}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (!selectedSize) {
                alert("Please select a size first");
                return;
              }
              addToCart(product._id, selectedSize);
            }}
            className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 active:bg-gray-700 transition-colors"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✔ 100% Authentic Products</p>
            <p>✔ Cash on Delivery Available</p>
            <p>✔ Easy 30-Day Returns & Exchanges</p>
          </div>
        </div>
      </div>

      {/** Description & Review Tabs */}
      <div className="mt-20">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-5 py-3 text-sm font-medium ${
              activeTab === "description"
                ? "border-b-2 border-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-3 text-sm font-medium ${
              activeTab === "reviews"
                ? "border-b-2 border-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="border px-6 py-6">
          {activeTab === "description" ? (
            <div className="flex flex-col gap-6 text-sm text-gray-600">
              <h3 className="font-medium text-lg">Product Overview</h3>
              <p>{productDescription.overview}</p>

              <div>
                <h4 className="font-medium mb-2">Key Features:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {productDescription.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Specifications:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(productDescription.specifications).map(
                    ([key, value]) => (
                      <React.Fragment key={key}>
                        <span className="font-medium capitalize">{key}:</span>
                        <span>{value}</span>
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < review.rating
                            ? assets.star_icon
                            : assets.star_dull_icon
                        }
                        alt=""
                        className="w-3.5"
                      />
                    ))}
                    <span className="font-medium">{review.name}</span>
                    <span className="text-gray-400 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}

              <button className="mt-4 text-sm text-gray-500 hover:text-black">
                + Load more reviews
              </button>
            </div>
          )}
        </div>
      </div>

      {/** Related Products */}
      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  );
};

export default Product;
