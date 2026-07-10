import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

function Dashboard() {
  return (
    <Layout>
      {/* HEADER */}

      <div className="mb-10">
        <h1
          className="
          text-4xl
          font-bold
          text-gray-900
          "
        >
          Admin Dashboard 🛠
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Manage restaurant operations and reservations
        </p>
      </div>

      {/* ACTION CARDS */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        "
      >
        {/* RESERVATIONS */}

        <Link
          to="/admin/reservations"
          className="
          bg-white
          border
          shadow
          rounded-2xl
          p-8
          hover:shadow-lg
          hover:-translate-y-1
          transition
          "
        >
          <div
            className="
            text-4xl
            mb-4
            "
          >
            📅
          </div>

          <h2
            className="
            text-2xl
            font-bold
            text-gray-900
            "
          >
            Reservations
          </h2>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            View, filter, update and cancel customer bookings.
          </p>
        </Link>

        {/* TABLE MANAGEMENT */}

        <Link
          to="/admin/tables"
          className="
          bg-white
          border
          shadow
          rounded-2xl
          p-8
          hover:shadow-lg
          hover:-translate-y-1
          transition
          "
        >
          <div
            className="
            text-4xl
            mb-4
            "
          >
            🍽
          </div>

          <h2
            className="
            text-2xl
            font-bold
            text-gray-900
            "
          >
            Table Management
          </h2>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Configure restaurant tables and seating capacity.
          </p>
        </Link>
      </div>

      {/* INFO SECTION */}

      <div
        className="
        mt-10
        bg-white
        rounded-2xl
        border
        shadow
        p-8
        "
      >
        <h2
          className="
          text-xl
          font-bold
          mb-4
          "
        >
          System Overview
        </h2>

        <div
          className="
          grid
          md:grid-cols-3
          gap-5
          "
        >
          <Info title="RBAC Security" text="Protected admin-only access" />

          <Info title="Availability Check" text="Prevents double bookings" />

          <Info title="Table Allocation" text="Capacity based reservations" />
        </div>
      </div>
    </Layout>
  );
}

function Info({ title, text }) {
  return (
    <div
      className="
bg-gray-50
rounded-xl
p-5
"
    >
      <h3 className="font-semibold">{title}</h3>

      <p className="text-gray-500 text-sm mt-1">{text}</p>
    </div>
  );
}

export default Dashboard;
