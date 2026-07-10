import express from "express";

import {
  createTable,
  getTables,
  updateTable,
  deleteTable,
} from "../controller/table.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// admin protection

router.use(protect);

router.use(authorize("admin"));

router.post(
  "/",

  createTable,
);

router.get(
  "/",

  getTables,
);

router.patch(
  "/:id",

  updateTable,
);

router.delete(
  "/:id",

  deleteTable,
);

export default router;
