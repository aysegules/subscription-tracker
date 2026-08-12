import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";
import { subscriptionSchema } from "../validators/subscriptionValidator.js";

const router = Router();

router.get("/:id", authMiddleware, getUserSubscriptions);
router.post(
  "/",
  validateRequest(subscriptionSchema),
  authMiddleware,
  createSubscription,
);

export default router;
