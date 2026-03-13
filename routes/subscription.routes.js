const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createSubscription,
  getSubscriptions,
  getSubscription,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/subscription.controller");

router.post("/", authMiddleware, createSubscription)
router.get("/", authMiddleware, getSubscriptions)
router.get("/:id", authMiddleware, getSubscription)
router.put("/:id", authMiddleware, updateSubscription)
router.delete("/:id", authMiddleware, deleteSubscription)

module.exports = router