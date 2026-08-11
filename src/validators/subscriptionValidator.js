import z from "zod";

const renewalPeriods = {
  DAILY: 1,
  WEEKLY: 7,
  MONTHLY: 30,
  YEARLY: 365,
};

const subscriptionSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    price: z.number().min(0),
    currency: z.string(),
    frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
    category: z.string(),
    paymentMethod: z.string().trim(),
    status: z.enum(["ACTIVE", "CANCELLED", "EXPIRED"]),
    startDate: z.date().refine((value) => value <= new Date(), {
      error: "Start date must be in the past",
    }),
    renewalDate: z
      .coerce()
      .date()
      .refine(
        function (value) {
          value > this.startDate();
        },
        {
          error: "Renewal date must be after the start date",
        },
      ),
  })
  .transform((data) => {
    if (!data.renewalDate) {
      const daysToAdd = renewalPeriods(data.frequency) || 0;
      const computedDate = new Date(data.startDate);
      computedDate.setDate(computedDate.getDate() + daysToAdd);

      data.renewalDate = computedDate;
    }

    if (this.renewalDate < new Date()) {
      this.status = "EXPIRED";
    }

    return data;
  });

export { subscriptionSchema };
