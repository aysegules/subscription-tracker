import { prisma } from "../../lib/prisma.ts";
import { workflowClient } from "../config/upstash.js";

const createSubscription = async (req, res, next) => {
  try {
    const subscription = await prisma.subscription.create({
      data: {
        ...req.body,
        userId: req.user.id,
      },
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${process.env.SERVER_URL}${process.env.VERSION}/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({
      status: "success",
      data: {
        subscription,
        workflowRunId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== parseInt(req.params.id)) {
      const error = new Error("Access denied");
      error.statusCode = 403;
      return next(error);
    }

    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: parseInt(req.params.id),
      },
    });

    res.status(200).json({ status: "success", data: { subscriptions } });
  } catch (error) {
    next(error);
  }
};

export { createSubscription, getUserSubscriptions };
