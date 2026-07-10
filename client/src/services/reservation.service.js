import api from "../api/axios";

// create booking

export const createReservation = (data) => {
  return api.post("/reservations", data);
};

// get my reservations

export const getMyReservations = () => {
  return api.get("/reservations/my");
};

// cancel booking

export const cancelReservation = (id) => {
  return api.patch(`/reservations/${id}/cancel`);
};
