const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerMob: String,
  orderId: String,
  paymentId: String,
  amount: Number,
  currency: String,
  status: String,
  receipt: String,
});
const PaymentModel = mongoose.model("Orders", paymentSchema);

module.exports = PaymentModel;
