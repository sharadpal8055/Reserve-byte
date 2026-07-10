import api from "../api/axios";

// GET ALL RESERVATIONS

export const getReservations = (date) => {
  let url = "/admin/reservations";

  if (date) {
    url += `?date=${date}`;
  }

  return api.get(url);
};

// UPDATE RESERVATION

export const updateReservation = (id, data) => {
  return api.patch(`/admin/reservations/${id}`, data);
};

// CANCEL RESERVATION

export const cancelAdminReservation = (id) => {
  return api.delete(`/admin/reservations/${id}`);
};

// TABLE APIs

export const getTables = () => {
  return api.get("/admin/tables");
};

export const createTable = (data) => {
  return api.post("/admin/tables", data);
};

export const updateTable = (id, data) => {
  return api.patch(`/admin/tables/${id}`, data);
};

export const deleteTable = (id) => {
  return api.delete(`/admin/tables/${id}`);
};
