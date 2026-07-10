import express from "express";

import {
  getReservations,
  updateReservation,
  deleteReservation,
} from "../controller/admin.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// every route below admin only

router.use(protect);

router.use(authorize("admin"));

router.get(
  "/reservations",

  getReservations,
);

router.patch(
  "/reservations/:id",

  updateReservation,
);

router.delete(
  "/reservations/:id",

  deleteReservation,
);

export default router;
