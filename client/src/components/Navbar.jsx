import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { toast } from "react-toastify";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out");

    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `

    px-4
    py-2
    rounded-xl
    text-sm
    font-medium
    transition

    ${
      isActive
        ? "bg-black text-white shadow"
        : "text-gray-600 hover:bg-gray-100"
    }

    `;

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      h-16
      px-10
      bg-white
      border-b
      shadow-sm
      flex
      items-center
      justify-between
      "
    >
      {/* LOGO */}

      <Link
        to="/"
        className="
        flex
        items-center
        gap-2
        text-xl
        font-bold
        text-gray-900
        hover:text-gray-700
        "
      >
        <span className="text-2xl">🍽</span>

        <span>ReserveBite</span>
      </Link>

      {/* NAV LINKS */}

      <div
        className="
        flex
        items-center
        gap-3
        "
      >
        {user?.role === "customer" && (
          <>
            <NavLink className={linkStyle} to="/customer/dashboard">
              Dashboard
            </NavLink>

            <NavLink className={linkStyle} to="/customer/book">
              Book Table
            </NavLink>

            <NavLink className={linkStyle} to="/customer/reservations">
              Reservations
            </NavLink>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <NavLink className={linkStyle} to="/admin/dashboard">
              Dashboard
            </NavLink>

            <NavLink className={linkStyle} to="/admin/reservations">
              Reservations
            </NavLink>

            <NavLink className={linkStyle} to="/admin/tables">
              Tables
            </NavLink>
          </>
        )}

        {/* USER */}

        <div
          className="
          ml-5
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            text-right
            hidden
            md:block
            "
          >
            <p
              className="
              text-sm
              font-semibold
              "
            >
              {user?.name}
            </p>

            <p
              className="
              text-xs
              text-gray-500
              capitalize
              "
            >
              {user?.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-xl
            text-sm
            hover:bg-red-600
            transition
            "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
