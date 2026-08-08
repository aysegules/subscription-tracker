import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "../lib/prisma.ts";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

config();

const app = express();

//Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const VERSION = process.env.VERSION || "/api/v1";

app.use(`${VERSION}/auth`, authRouter);
app.use(`${VERSION}/users`, userRouter);
app.use(`${VERSION}/subscriptions`, subscriptionRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Subscription Tracker API!" });
});

const PORT = process.env.PORT || 5500;

const server = app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  await connectDB();
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
