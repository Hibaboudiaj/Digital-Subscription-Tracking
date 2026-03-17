const Subscription = require("../models/subscription.model");

// Create subscription
const CreateSubscription = async (req, res) => {
  try {
    const { name, price, billingCycle } = req.body;

    if (!name || !price || !billingCycle) {
      return res.status(400).json({ message: "remplir tous les champs" });
    }
    if (price <= 0) {
      return res.status(400).json({ message: "must be great than 0" });
    }
    if (!["monthly", "yearly"].includes(billingCycle)) {
      return res.status(400).json({ message: "billingCycle must be monthly or yearly" });
    }

    const subscription = await Subscription.create({
      name,
      price,
      billingCycle,
      userId: req.user._id, 
    });

    res.status(201).json({ subscription });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all subscriptions of the logged-in user
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user._id });
    res.status(200).json({ subscriptions });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single subscription by id (ownership check)
const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Ownership check
    if (subscription.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    res.status(200).json({ subscription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update subscription
const UpdateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Ownership check
    if (subscription.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    const { name, price, billingCycle } = req.body;

    // Validation 
    if (price !== undefined && price <= 0) {
      return res.status(400).json({ message: "must be great than 0" });
    }
    if (billingCycle && !["monthly", "yearly"].includes(billingCycle)) {
      return res.status(400).json({ message: "billingCycle must be monthly or yearly" });
    }

    subscription.name = name || subscription.name;
    subscription.price = price || subscription.price;
    subscription.billingCycle = billingCycle || subscription.billingCycle;

    await subscription.save();
    res.status(200).json({ subscription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete subscription
const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Ownership check
    if (subscription.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    await Subscription.findByIdAndDelete(subscription._id);
    res.status(200).json({ message: "Subscription deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  CreateSubscription,
  getSubscriptions,
  getSubscription,
  UpdateSubscription,
  deleteSubscription,
};