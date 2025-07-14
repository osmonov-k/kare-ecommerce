import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response?.data?.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id: productId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product deletion simulated successfully (demo mode)");
        await fetchProductList();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove product");
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }

  if (!products?.length) {
    return <div className="p-4 text-center">No products found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Product Inventory</h2>
      <div className="flex flex-col gap-2">
        {/** List Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm">
          <span className="font-bold">Image</span>
          <span className="font-bold">Name</span>
          <span className="font-bold">Category</span>
          <span className="font-bold">Price</span>
          <span className="font-bold text-center">Action</span>
        </div>

        {/** Products list */}
        {products.map((product) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm hover:bg-gray-50"
            key={product._id}
          >
            <img
              className="w-12 h-12 object-cover"
              src={product.image[0]}
              alt={product.name}
              loading="lazy"
            />
            <p className="truncate">{product.name}</p>
            <p className="capitalize">{product.category}</p>
            <p className="font-medium">
              {currency}
              {product.price.toFixed(2)}
            </p>
            <button
              onClick={() => handleRemoveProduct(product._id)}
              className="text-red-500 hover:text-red-700 cursor-pointer text-center"
              aria-label={`Remove product ${product.name}`}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
