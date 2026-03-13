const express = require("express");
const router = express.Router();

// middleware
const authMiddleware = require("../middlewares/auth.middleware");

// controllers
const {
  CreateSubscription,
  getSubscriptions,
  getSubscription,
  UpdateSubscription,
  deleteSubscription,
} = require("../controllers/subscription.controller");

// routes
router.post("/", authMiddleware, CreateSubscription);           // ← هاد سطر 12
router.get("/", authMiddleware, getSubscriptions);
router.get("/:id", authMiddleware, getSubscription);
router.put("/:id", authMiddleware, UpdateSubscription);
router.delete("/:id", authMiddleware, deleteSubscription);

module.exports = router;