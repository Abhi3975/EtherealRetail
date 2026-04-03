const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Alright, slow down. Too many requests.",
});
app.use("/api", apiLimiter);

const mongoTargetDatabaseString =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ethereal_local_dev";

mongoose
  .connect(mongoTargetDatabaseString, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Looks like Mongo is actually running. Nice.");
  })
  .catch((mongoConnectionProblem) => {
    console.log(
      "Mongo's being annoying again. Double check if the daemon is up on your machine.",
      mongoConnectionProblem.message,
    );
  });

app.get("/api/ping", (req, res) => {
  return res.status(200).json({
    message: "Server is alive and kicking, surprisingly.",
  });
});

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const analyticsRoutes = require("./routes/analytics");

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  const LISTENING_PORT = process.env.PORT || 5000;
  app.listen(LISTENING_PORT, () => {
    console.log(`Backend threw itself onto port ${LISTENING_PORT}`);
  });
}

module.exports = app;
