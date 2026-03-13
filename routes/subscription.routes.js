const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { createSubscription } = require("../controllers/subscriptioncontroller");

// ay route safe
router.post("/", authMiddleware, createSubscription);

module.exports = router;
