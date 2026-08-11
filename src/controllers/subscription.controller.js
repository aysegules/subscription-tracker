import { prisma } from "../../lib/prisma.ts";

const createSubscription = async (req, res, next) => {
  try {
    const subscription = await prisma.subscription.create({
      data: {
        ...req.body,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
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
