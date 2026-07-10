import express from "express";
import validate from "../middleware/validate.middleware.js";
import {
  createReservation,
  myReservations,
  cancelReservation,
} from "../controller/reservation.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { reservationSchema } from "../validators/reservation.validator.js";
const router = express.Router();

router.post(
  "/",

  protect,

  validate(reservationSchema),

  createReservation,
);

router.get("/my", protect, myReservations);

router.patch("/:id/cancel", protect, cancelReservation);

export default router;
