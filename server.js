//start express  .  connect mongodb  .  load routes//

const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
// const subscriptionRoutes = require("./routes/subscription.routes");

const app = express();

app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
// app.use("/subscriptions", subscriptionRoutes);

app.listen(8000, () => {
  console.log("Server running on port http://localhost:8000 🚀");
});
