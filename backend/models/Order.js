const mongoose = require('mongoose');

const orderSnapshotSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // We need to keep a concrete snapshot of what they bought.
  // Don't just link to the Product ID, because if the admin changes the price
  // or deletes the product later, the order history gets completely messed up.
  lineItems: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    titleAtPurchase: String,
    skuAtPurchase: String,
    priceAtPurchase: Number,
    quantityBought: Number,
    variantDetails: String // Like "Size: XL, Color: Blue"
  }],
  financials: {
    subtotal: Number,
    taxAmount: Number,
    shippingFee: Number,
    grandTotal: {
      type: Number,
      required: true
    }
  },
  shippingDestination: {
    fullName: String,
    streetAddress: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending_gateway', 'paid', 'failed', 'cod_pending'],
    default: 'pending_gateway'
  },
  fulfillmentState: {
    type: String,
    enum: ['Order Placed', 'Packing', 'Shipped', 'Out For Delivery', 'Delivered', 'Canceled'],
    default: 'Order Placed'
  },
  gatewayReference: String // E.g. Stripe checkout session ID or Razorpay signature
}, {
  timestamps: true
});

const OrderRecord = mongoose.model('Order', orderSnapshotSchema);

module.exports = OrderRecord;
