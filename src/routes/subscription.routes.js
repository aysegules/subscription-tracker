import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const router = Router();

router.get("/", () => {});
router.get("/:id", () => {}); //get details
router.post("/", authMiddleware, createSubscription);
router.put("/:id", () => {}); //update
router.delete("/:id", () => {}); //delete
router.get("/:id", authMiddleware, getUserSubscriptions); //get user subs
router.put("/:id/cancel", () => {}); //cancel subs
router.get("/upcoming-renewals", () => {}); //get upcoming
export default router;
