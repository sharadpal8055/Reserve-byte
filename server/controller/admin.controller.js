import Reservation from "../models/reservation.model.js";

// GET ALL RESERVATIONS

export const getReservations = async (req, res, next) => {
  try {
    let filter = {};

    // date filter

    if (req.query.date) {
      filter.date = req.query.date;
    }

    const reservations = await Reservation.find(filter)

      .populate("user", "name email")

      .populate("table")

      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,

      count: reservations.length,

      reservations,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE ANY RESERVATION

export const updateReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    const {
      date,

      startTime,

      endTime,

      guests,

      status,
    } = req.body;

    if (date) reservation.date = date;

    if (startTime) reservation.startTime = startTime;

    if (endTime) reservation.endTime = endTime;

    if (guests) reservation.guests = guests;

    if (status) reservation.status = status;

    await reservation.save();

    res.json({
      success: true,

      message: "Reservation updated",

      reservation,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN CANCEL RESERVATION

export const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    reservation.status = "cancelled";

    await reservation.save();

    res.json({
      success: true,

      message: "Reservation cancelled by admin",
    });
  } catch (error) {
    next(error);
  }
};
