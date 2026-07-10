import { z } from "zod";

export const reservationSchema = z
  .object({
    date: z.string().min(1, "Date is required"),

    startTime: z.string().min(1, "Start time required"),

    endTime: z.string().min(1, "End time required"),

    guests: z.number().min(1, "At least one guest required"),
  })

  // end time validation

  .refine(
    (data) => {
      return data.startTime < data.endTime;
    },

    {
      message: "End time must be after start time",

      path: ["endTime"],
    },
  )

  // prevent past dates

  .refine(
    (data) => {
      const today = new Date().toISOString().split("T")[0];

      return data.date >= today;
    },

    {
      message: "Cannot book past dates",

      path: ["date"],
    },
  );
