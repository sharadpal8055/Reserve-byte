import Reservation from "../models/reservation.model.js";

import Table from "../models/table.model.js";
export const createReservation = async (req, res, next) => {
  try {
    const {
      date,

      startTime,

      endTime,

      guests,
    } = req.body;

    // STEP 1
    // Find tables with enough capacity

    const tables = await Table.find({
      capacity: {
        $gte: guests,
      },
    }).sort({
      capacity: 1,
    });

    if (tables.length === 0) {
      return res.status(400).json({
        message: "No table available for capacity",
      });
    }

    let selectedTable = null;

    // STEP 2
    // Check every suitable table

    for (const table of tables) {
      const conflict = await Reservation.findOne({
        table: table._id,

        date,

        status: "confirmed",

        $and: [
          {
            startTime: {
              $lt: endTime,
            },
          },

          {
            endTime: {
              $gt: startTime,
            },
          },
        ],
      });

      if (!conflict) {
        selectedTable = table;

        break;
      }
    }

    if (!selectedTable) {
      return res.status(409).json({
        message: "No table available in this time slot",
      });
    }

    // STEP 3
    // create booking

    const reservation = await Reservation.create({
      user: req.user._id,

      table: selectedTable._id,

      date,

      startTime,

      endTime,

      guests,
    });

    res.status(201).json({
      success: true,

      reservation,
    });
  } catch (error) {
    next(error);
  }
};
export const myReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({
      user: req.user._id,
    })

      .populate("table")

      .sort({
        date: -1,

        createdAt: -1,
      });

    res.json({
      success: true,

      reservations,
    });
  } catch (error) {
    next(error);
  }
};
export const cancelReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,

      user: req.user._id,
    });

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    if (reservation.status === "cancelled") {
      return res.status(400).json({
        message: "Reservation already cancelled",
      });
    }

    reservation.status = "cancelled";

    await reservation.save();

    res.json({
      success: true,

      message: "Reservation cancelled",
    });
  } catch (error) {
    next(error);
  }
};
