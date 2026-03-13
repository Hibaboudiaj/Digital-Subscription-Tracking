const { string, required } = require("joi");
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: string,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
    },
    billingCycle: {
      type: string,
      enum: ["monthly", "yearly"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }, // createdAt و updatedAt
);

module.exports = mongoose.model("Subscription", subscriptionSchema);