import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUsers, getUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", authMiddleware, getUser);

export default router;
