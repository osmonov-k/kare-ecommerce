import userModel from "../models/userModel.js";

// Add products to user cart
const addItemToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const user = await userModel.findById(userId);
    let userCart = user.cartData;

    if (userCart[itemId]) {
      if (userCart[itemId][size]) {
        userCart[itemId][size] += 1;
      } else {
        userCart[itemId][size] = 1;
      }
    } else {
      userCart[itemId] = {};
      userCart[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData: userCart });
    res.json({ success: true, message: "Item added to cart" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// Modify user cart
const modifyCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const user = await userModel.findById(userId);
    let userCart = user.cartData;

    userCart[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData: userCart });
    res.json({ success: true, message: "Cart modified" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// Fetch user cart data
const fetchUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    let userCart = user.cartData;

    res.json({ success: true, cartData: userCart });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export {
  addItemToCart as addToCart,
  modifyCart as updateCart,
  fetchUserCart as getUserCart,
};
