const Subscription = require("../models/subscription.model");

// 1️⃣ Create subscription
const CreateSubscription = async (req, res) => {
  try {
    const { name, price, billingCycle } = req.body;

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
// 2️⃣ Get all subscriptions of the logged-in user
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user._id });
    res.status(200).json({ subscriptions });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// 3️⃣ Get single subscription by id (ownership check)
const getSubscription = (async = (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if(!subscription){
      return res.status(404).json({message:"Subscription not found"})
    }
    res.status(200).json({subscription})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
});
// 4️⃣ Update subscription
const UpdateSubscription = async (req, res)=>{
  try {
    const subscription = await Subscription.findById(req.params.id)
    if (!subscription) {
      return res.status(404).json({message:"Subscription not found"})
    }
    const {name, price, billingCycle} = req.body
    subscription.name = name || subscription.name
    subscription.price = price || subscription.price
    subscription.billingCycle = billingCycle || subscription.billingCycle;

    await subscription.save();
    res.status(200).json({subscription});

  } catch (error) {
    res.status(400).json({message:error.message});
  }
}
// 5️⃣ Delete subscription
const deleteSubscription = async (req, res)=>{
  try {
    const subscription = await Subscription.findById(req.params.id)
    if(!subscription){
      return res.status(404).json({message : "Subscription not found" })
    }
    await subscription.remove()
    res.status(200).json({message: "Subscription deleted" });
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

module.exports = {
  CreateSubscription,
  getSubscriptions,
  getSubscription,
  UpdateSubscription,
  deleteSubscription,
};