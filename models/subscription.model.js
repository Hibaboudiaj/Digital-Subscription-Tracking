const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    name: {                
      type: String,
      required: true,
      trim:true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);