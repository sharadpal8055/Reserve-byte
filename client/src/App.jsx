import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import CustomerDashboard from "./pages/customer/Dashboard";

import AdminDashboard from "./pages/admin/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminRoute from "./routes/AdminRoute";
import CreateReservation from "./pages/customer/CreateReservation";

import MyReservations from "./pages/customer/MyReservations";
import AdminReservations from "./pages/admin/Reservations";

import Tables from "./pages/admin/Tables";
import Home from "./pages/Home";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
     <Route 
  path="/" 
  element={<Home />} 
/>

      <Route path="/register" element={<Register />} />

      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/customer/book"
        element={
          <ProtectedRoute>
            <CreateReservation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/reservations"
        element={
          <ProtectedRoute>
            <MyReservations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reservations"
        element={
          <AdminRoute>
            <AdminReservations />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/tables"
        element={
          <AdminRoute>
            <Tables />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
