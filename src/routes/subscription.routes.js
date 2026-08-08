import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", () => {});
subscriptionRouter.get("/:id", () => {});
subscriptionRouter.post("/:id", () => {});
subscriptionRouter.put("/:id", () => {});
subscriptionRouter.delete("/:id", () => {});
subscriptionRouter.get("/user/:id", () => {});
subscriptionRouter.put("/:id/cancel", () => {});
subscriptionRouter.get("/upcoming-renewals", () => {});
export default subscriptionRouter;
