import { serve } from "@upstash/workflow/express";
import { prisma } from "../../lib/prisma.ts";
import dayjs from "dayjs";
import { sendReminderEmail } from "../utils/sendEmail.js";

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

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `${daysBefore} days before reminder`,
        reminderDate,
      );
    }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `${daysBefore} days before reminder`,
        subscription,
      );
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: {
        user: {
          select: { email: true, name: true },
        },
      },
    });
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleepind until ${label} reminder at ${date}`);

  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);
    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
};

export { sendReminders };
