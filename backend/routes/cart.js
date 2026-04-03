const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

const getSession = (req) => req.headers["x-session-id"] || "anon_session_1";

router.get("/", async (req, res) => {
  try {
    const sessionId = getSession(req);

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
      await cart.save();
    }

    res.json({
      success: true,
      data: cart.items,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Cart fetching blew up",
        error: err.message,
      });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { productId, variant, quantity = 1 } = req.body;
    const sessionId = getSession(req);

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Can't add ghosts to the cart." });
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.variant === (variant || "Default"),
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        variant: variant || "Default",
        quantity: quantity,
      });
    }

    await cart.save();

    return res.json({
      success: true,
      message: "Tossed into the bag.",
      cartStore: cart.items,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Couldn't add to cart",
        error: err.message,
      });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const { productId, variant } = req.body;
    const sessionId = getSession(req);

    let cart = await Cart.findOne({ sessionId });
    if (!cart) return res.json({ success: true, cartStore: [] });

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.variant === (variant || "Default")
        ),
    );

    await cart.save();

    return res.json({
      success: true,
      message: "Yeah, it's gone.",
      cartStore: cart.items,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Couldn't remove item",
        error: err.message,
      });
  }
});

module.exports = router;
