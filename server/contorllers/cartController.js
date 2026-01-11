import userModel from "../models/userModel.js"
import foodModel from "../models/foodModel.js";



const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "userId and itemId are required" });
    }
const food = await foodModel.findById(itemId);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }


    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};

    
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();
    const check = await userModel.findById(userId);
console.log("AFTER SAVE FROM DB:", check.cartData);


    res.json({ success: true, message: "Added to cart", cartData });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error", error: e.message });
  }
};







const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "userId and itemId are required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      return res.json({ success: false, message: "Item not in cart" });
    }

    cartData[itemId] -= 1;

    if (cartData[itemId] <= 0) {
      delete cartData[itemId];
    }

    userData.cartData = cartData;
    userData.markModified("cartData"); 
    await userData.save();

    res.json({ success: true, message: "Removed from cart", cartData });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    
    const itemIds = Object.keys(cartData);
    const items = await foodModel.find({ _id: { $in: itemIds } });

    const cartDetails = items.map(item => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: cartData[item._id] || 0
    }));

    res.json({ success: true, cart: cartDetails, rawCart: cartData });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error", error: e.message });
  }
};




export {addToCart,removeFromCart,getCart}