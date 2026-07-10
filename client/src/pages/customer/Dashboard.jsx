import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

function Dashboard() {
  return (
    <Layout>
      {/* HEADER */}

      <div
        className="
        mb-10
        "
      >
        <h1
          className="
          text-4xl
          font-bold
          text-gray-900
          "
        >
          Welcome,
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Manage your restaurant reservations easily
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
        {/* BOOK CARD */}

        <Link
          to="/customer/book"
          className="
          bg-white
          rounded-2xl
          shadow
          border
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
            Book Reservation
          </h2>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Reserve available tables based on your preferred date and time.
          </p>
        </Link>

        {/* RESERVATION CARD */}

        <Link
          to="/customer/reservations"
          className="
          bg-white
          rounded-2xl
          shadow
          border
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
            My Reservations
          </h2>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            View your upcoming bookings or cancel reservations.
          </p>
        </Link>
      </div>
    </Layout>
  );
}

export default Dashboard;
