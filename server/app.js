import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import tableRoutes from "./routes/table.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// CORS CONFIG (FIRST)

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// BODY PARSER

app.use(express.json());

// COOKIE PARSER

app.use(cookieParser());

// HEALTH CHECK

app.get(
  "/",

  (req, res) => {
    res.status(200).json({
      success: true,

      message: "Restaurant API running",
    });
  },
);

// ROUTES

app.use("/api/auth", authRoute);

app.use("/api/reservations", reservationRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/admin/tables", tableRoutes);

// ERROR HANDLER ALWAYS LAST

app.use(errorMiddleware);

export default app;
