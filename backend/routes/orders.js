const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protectRoute } = require("../middleware/auth");

router.post("/place", protectRoute, async (req, res) => {
  const { lineItems, shippingDestination, paymentMethod } = req.body;

  if (!lineItems || lineItems.length === 0) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Trying to buy air? The cart is empty.",
      });
  }

  try {
    const subtotal = lineItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const grandTotal = subtotal;

    console.log(`Processing an authenticated order for $${grandTotal}...`);

    const userId = req.user.id;

    const orderRecord = new Order({
      userId: userId,
      lineItems: lineItems.map((item) => ({
        productId: item.productId,
        titleAtPurchase: item.title || "Atelier Masterpiece",
        priceAtPurchase: item.price,
        quantityBought: item.quantity,
      })),
      financials: { subtotal, taxAmount: 0, shippingFee: 15, grandTotal },
      paymentStatus:
        paymentMethod === "cod" ? "cod_pending" : "pending_gateway",
      shippingDestination: shippingDestination || {},
    });

    const savedOrder = await orderRecord.save();

    if (paymentMethod === "cod") {
      return res.json({
        success: true,
        message: "Order locked in. Have cash ready when the guy shows up.",
        orderId: savedOrder._id,
      });
    }

    return res.json({
      success: true,
      message: "Handing off to payment gateway...",
      orderId: savedOrder._id,
      gatewayRef: `mock_session_${Date.now()}`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to place order",
        error: err.message,
      });
  }
});

router.get("/list", protectRoute, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not fetch orders",
        error: err.message,
      });
  }
});

module.exports = router;
