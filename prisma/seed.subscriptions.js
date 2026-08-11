import { prisma } from "../lib/prisma.ts";

const subscriptions = [
  {
    id: 1,
    userId: 1,
    name: "Netflix Premium",
    price: 19.99,
    currency: "USD",
    frequency: "WEEKLY",
    category: "Entertainment",
    paymentMethod: "Credit Card",
    status: "ACTIVE",
    startDate: "2026-01-01T00:00:00.000Z",
    renewalDate: "2026-09-01T00:00:00.000Z",
  },
  {
    id: 2,
    userId: 1,
    name: "Spotify Premium",
    price: 5.99,
    currency: "USD",
    frequency: "MONTHLY",
    category: "Music",
    paymentMethod: "PayPal",
    status: "ACTIVE",
    startDate: "2026-03-15T00:00:00.000Z",
    renewalDate: "2026-08-15T00:00:00.000Z",
  },
  {
    id: 3,
    userId: 2,
    name: "Gym Membership",
    price: 120.0,
    currency: "USD",
    frequency: "YEARLY",
    category: "Health",
    paymentMethod: "Bank Transfer",
    status: "CANCELLED",
    startDate: "2025-01-10T00:00:00.000Z",
    renewalDate: "2026-01-10T00:00:00.000Z",
  },
];

const main = async () => {
  console.log("Seeding subscriptions...");

  for (const subscription of subscriptions) {
    await prisma.subscription.create({
      data: subscription,
    });

    console.log(`Created subscription: ${subscription.name}`);
  }

  console.log("Completed!");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
