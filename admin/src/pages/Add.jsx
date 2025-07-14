import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const ProductForm = ({ token }) => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e, imageKey) => {
    if (e.target.files[0]) {
      setImages((prev) => ({ ...prev, [imageKey]: e.target.files[0] }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((item) => item !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "sizes") {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      Object.entries(images).forEach(([key, file]) => {
        if (file) formDataToSend.append(key, file);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formDataToSend,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product added successfully");
        // Reset form
        setImages({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "Men",
          subCategory: "Topwear",
          bestseller: false,
          sizes: [],
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-4 p-4"
    >
      <div>
        <h2 className="text-lg font-semibold mb-3">Add New Product</h2>
        <p className="mb-2 text-sm font-medium">Upload Product Images</p>
        <div className="flex gap-3 flex-wrap">
          {[1, 2, 3, 4].map((num) => (
            <label key={num} htmlFor={`image${num}`} className="cursor-pointer">
              <img
                className="w-20 h-20 object-cover border rounded"
                src={
                  images[`image${num}`]
                    ? URL.createObjectURL(images[`image${num}`])
                    : assets.upload_area
                }
                alt={`Product preview ${num}`}
              />
              <input
                onChange={(e) => handleImageChange(e, `image${num}`)}
                type="file"
                id={`image${num}`}
                accept="image/*"
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <label className="block mb-2 text-sm font-medium">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          type="text"
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="w-full">
        <label className="block mb-2 text-sm font-medium">
          Product Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Enter product description"
          rows="3"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div>
          <label className="block mb-2 text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Sub Category</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="w-full">
        <label className="block mb-2 text-sm font-medium">
          Available Sizes
        </label>
        <div className="flex gap-2 flex-wrap">
          {["S", "M", "L", "XL", "2XL"].map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className="cursor-pointer"
            >
              <span
                className={`px-4 py-2 rounded-full text-sm ${
                  formData.sizes.includes(size)
                    ? "bg-pink-100 text-pink-800 border border-pink-300"
                    : "bg-gray-100 text-gray-800 border border-gray-300"
                }`}
              >
                {size}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          name="bestseller"
          checked={formData.bestseller}
          onChange={handleInputChange}
          type="checkbox"
          id="bestseller"
          className="w-4 h-4"
        />
        <label
          htmlFor="bestseller"
          className="text-sm font-medium cursor-pointer"
        >
          Mark as Bestseller
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-28 py-2 mt-4 text-white rounded ${
          isSubmitting ? "bg-gray-400" : "bg-black hover:bg-gray-800"
        }`}
      >
        {isSubmitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
