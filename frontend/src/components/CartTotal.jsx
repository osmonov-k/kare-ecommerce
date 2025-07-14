import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const {
    currency,
    delivery_fee: deliveryFee,
    getCartAmount,
  } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <section className="w-full" aria-label="Cart totals">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span aria-label={`Subtotal: ${currency}${subtotal.toFixed(2)}`}>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>

        <hr aria-hidden="true" />

        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span
            aria-label={`Shipping fee: ${currency}${deliveryFee.toFixed(2)}`}
          >
            {currency} {deliveryFee.toFixed(2)}
          </span>
        </div>

        <hr aria-hidden="true" />

        <div className="flex justify-between">
          <strong>Total</strong>
          <strong aria-label={`Total: ${currency}${total.toFixed(2)}`}>
            {currency} {total.toFixed(2)}
          </strong>
        </div>
      </div>
    </section>
  );
};

export default CartTotal;
