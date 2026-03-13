const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    name: {               // ← هاد السطر مهم يكون Object
      type: String,       // type لازم يكون String / Number / Boolean / ObjectId
      required: true,
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