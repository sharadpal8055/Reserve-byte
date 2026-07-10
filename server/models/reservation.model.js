import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    table: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Table",

      required: true,
    },

    date: {
      type: String,

      required: true,
    },

    startTime: {
      type: String,

      required: true,
    },

    endTime: {
      type: String,

      required: true,
    },

    guests: {
      type: Number,

      required: true,
    },

    status: {
      type: String,

      enum: ["confirmed", "cancelled"],

      default: "confirmed",
    },
  },

  {
    timestamps: true,
  },
);
reservationSchema.index({
  table: 1,

  date: 1,

  startTime: 1,

  endTime: 1,

  status: 1,
});
const Reservation = mongoose.model(
  "Reservation",

  reservationSchema,
);

export default Reservation;
