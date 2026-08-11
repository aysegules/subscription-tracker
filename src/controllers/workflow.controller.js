import { serve } from "@upstash/workflow/express";
import { prisma } from "../../lib/prisma.ts";
import dayjs from "dayjs";

const REMINDERS = [7, 5, 2, 1];

const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "ACTIVE") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscripiton ${subscriptionId}.Stopping workflow...`,
    );
    return;
  }

  for (const deaysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(deaysBefore, "day");
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { user: true },
    });
  });
};

export { sendReminders };
