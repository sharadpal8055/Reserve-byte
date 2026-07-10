import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { checkServer } from "../services/health.service";
function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const connectServer = async () => {
      try {
        await checkServer();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    connectServer();
  }, []);
  if (loading) {
    return (
      <div
        className="
      min-h-screen
      w-full
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-gray-50
      via-white
      to-gray-100
      px-5
      "
      >
        <div
          className="
        bg-white
        shadow-2xl
        rounded-3xl
        p-10
        max-w-md
        w-full
        text-center
        border
        "
        >
          {/* LOGO */}

          <div
            className="
          text-6xl
          mb-5
          animate-bounce
          "
          >
            🍽️
          </div>

          {/* SPINNER */}

          <div
            className="
          mx-auto
          mb-6
          h-14
          w-14
          rounded-full
          border-4
          border-gray-200
          border-t-black
          animate-spin
          "
          />

          {/* TITLE */}

          <h1
            className="
          text-3xl
          font-bold
          text-gray-900
          "
          >
            Preparing Your Table
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
          text-gray-500
          mt-3
          leading-relaxed
          "
          >
            Connecting to our reservation server. This may take a few seconds
            while everything gets ready.
          </p>

          {/* LOADING DOTS */}

          <div
            className="
          flex
          justify-center
          gap-2
          mt-7
          "
          >
            <span
              className="
            h-3
            w-3
            bg-black
            rounded-full
            animate-pulse
            "
            />

            <span
              className="
            h-3
            w-3
            bg-black
            rounded-full
            animate-pulse
            delay-150
            "
            />

            <span
              className="
            h-3
            w-3
            bg-black
            rounded-full
            animate-pulse
            delay-300
            "
            />
          </div>

          {/* FOOTER */}

          <p
            className="
          text-xs
          text-gray-400
          mt-8
          "
          >
            ReserveBite • Smart Restaurant Booking
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className="
      min-h-screen
      bg-gray-50
      "
    >
      {/* NAVBAR */}

      <nav
        className="
        h-16
        bg-white
        shadow-sm
        px-10
        flex
        justify-between
        items-center
        "
      >
        <h1
          className="
          text-2xl
          font-bold
          "
        >
          🍽 ReserveBite
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="
            px-5
            py-2
            rounded-lg
            hover:bg-gray-100
            "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
            bg-black
            text-white
            px-5
            py-2
            rounded-lg
            "
          >
            Register
          </Link>
        </div>
      </nav>

      {/* HERO */}

      <section
        className="
        max-w-6xl
        mx-auto
        px-10
        py-20
        grid
        md:grid-cols-2
        gap-12
        items-center
        "
      >
        <div>
          <h1
            className="
            text-5xl
            font-bold
            leading-tight
            "
          >
            Smart Restaurant
            <br />
            Reservation System
          </h1>

          <p
            className="
            text-gray-600
            mt-6
            text-lg
            "
          >
            ReserveBite helps customers book restaurant tables easily while
            allowing administrators to manage reservations, tables, and
            availability.
          </p>

          <div
            className="
            flex
            gap-5
            mt-8
            "
          >
            <Link
              to="/register"
              className="
              bg-black
              text-white
              px-8
              py-3
              rounded-xl
              hover:bg-gray-800
              "
            >
              Book a Table
            </Link>

            <Link
              to="/login"
              className="
              border
              px-8
              py-3
              rounded-xl
              bg-white
              "
            >
              Login
            </Link>
          </div>
        </div>

        {/* CARD */}

        <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-10
          "
        >
          <h2
            className="
            text-2xl
            font-bold
            mb-6
            "
          >
            Why ReserveBite?
          </h2>

          <div className="space-y-5">
            <Feature
              title="Real Time Availability"
              text="Avoid duplicate bookings and table conflicts."
            />

            <Feature
              title="Role Based Access"
              text="Separate dashboards for customers and admins."
            />

            <Feature
              title="Smart Table Allocation"
              text="Automatically assigns tables based on capacity."
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section
        className="
        max-w-6xl
        mx-auto
        px-10
        pb-20
        grid
        md:grid-cols-3
        gap-6
        "
      >
        <Card
          icon="👤"
          title="Customers"
          text="Create, view and cancel reservations easily."
        />

        <Card
          icon="🛠"
          title="Admin Panel"
          text="Manage bookings and restaurant tables."
        />

        <Card
          icon="🔒"
          title="Secure Access"
          text="JWT authentication with protected routes."
        />
      </section>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div>
      <h3 className="font-semibold">✓ {title}</h3>

      <p className="text-gray-500">{text}</p>
    </div>
  );
}

function Card({ icon, title, text }) {
  return (
    <div
      className="
bg-white
shadow
rounded-2xl
p-6
"
    >
      <div className="text-3xl">{icon}</div>

      <h3
        className="
font-bold
text-xl
mt-3
"
      >
        {title}
      </h3>

      <p className="text-gray-500 mt-2">{text}</p>
    </div>
  );
}

export default Home;
