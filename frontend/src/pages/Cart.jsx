import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  //useMemo to prevent unnecessary recalculations
  const cartData = useMemo(() => {
    const tempData = [];
    if (products.length > 0) {
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            tempData.push({
              _id: itemId,
              size,
              quantity,
            });
          }
        }
      }
    }
    return tempData;
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {cartData.length > 0 ? (
        <>
          <div>
            {cartData.map((item) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={product.image[0]}
                      className="w-16 sm:w-20"
                      alt={product.name}
                    />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <span>
                          {currency}
                          {product.price}
                        </span>
                        <span className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                          {item.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  <input
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value > 0) {
                        updateQuantity(item._id, item.size, value);
                      }
                    }}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    type="number"
                    min={1}
                    value={item.quantity}
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-4 mr-4 sm:w-5 cursor-pointer self-center"
                    aria-label="Remove item"
                  >
                    <img src={assets.bin_icon} alt="Remove item" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800 transition-colors"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="py-10 text-center text-gray-500">
          Your cart is empty
        </div>
      )}
    </div>
  );
};

export default Cart;
