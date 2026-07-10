import { useEffect, useState } from "react";

import {
  getReservations,
  cancelAdminReservation,
} from "../../services/admin.service";

import Layout from "../../components/Layout";

import { toast } from "react-toastify";

function Reservations() {
  const getTodayDate = () => {
    const date = new Date();

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [date, setDate] = useState(getTodayDate());

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const load = async (selectedDate) => {
    try {
      setLoading(true);

      const res = await getReservations(selectedDate);

      setData(res.data.reservations || []);
    } catch (error) {
      toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(date);
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;
    try {
      await cancelAdminReservation(id);

      toast.success("Reservation cancelled");

      load(date);
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <Layout>
      {/* HEADER */}

      <div className="mb-8">
        <h1
          className="
text-4xl
font-bold
text-gray-900
"
        >
          📅 Reservations
        </h1>

        <p
          className="
text-gray-500
mt-2
"
        >
          View and manage customer table bookings
        </p>
      </div>

      {/* FILTER */}

      <div
        className="
bg-white
border
shadow
rounded-2xl
p-5
flex
flex-wrap
gap-4
items-center
mb-8
"
      >
        <input
          type="date"
          value={date}
          className="
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-black
"
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={() => load(date)}
          className="
bg-black
text-white
px-8
py-3
rounded-xl
hover:bg-gray-800
transition
"
        >
          Search
        </button>

        <span
          className="
text-gray-500
text-sm
"
        >
          Showing bookings for: <b>{date}</b>
        </span>
      </div>

      {/* CONTENT */}

      {loading ? (
        <div
          className="
bg-white
shadow
rounded-2xl
p-10
text-center
"
        >
          Loading reservations...
        </div>
      ) : data.length === 0 ? (
        <div
          className="
bg-white
border
shadow
rounded-2xl
p-12
text-center
"
        >
          <h2
            className="
text-xl
font-bold
"
          >
            No reservations found
          </h2>

          <p
            className="
text-gray-500
mt-2
"
          >
            There are no bookings for {date}
          </p>
        </div>
      ) : (
        <div
          className="
space-y-5
"
        >
          {data.map((item) => (
            <div
              key={item._id}
              className="
bg-white
border
shadow
rounded-2xl
p-6
flex
justify-between
items-center
hover:shadow-lg
transition
"
            >
              <div
                className="
space-y-2
"
              >
                <p>
                  👤
                  <span className="font-semibold">Customer:</span>{" "}
                  {item.user?.name}
                </p>

                <p>
                  📧
                  <span className="font-semibold">Email:</span>{" "}
                  {item.user?.email}
                </p>

                <p>
                  📅
                  <span className="font-semibold">Date:</span> {item.date}
                </p>

                <p>
                  ⏰<span className="font-semibold">Time:</span>{" "}
                  {item.startTime}-{item.endTime}
                </p>

                <p>
                  🍽
                  <span className="font-semibold">Table:</span>{" "}
                  {item.table?.tableNumber}
                </p>

                <p>
                  Status:{" "}
                  <span
                    className={`

px-3
py-1
rounded-full
text-sm


${
  item.status === "cancelled"
    ? "bg-red-100 text-red-600"
    : "bg-green-100 text-green-600"
}

`}
                  >
                    {item.status}
                  </span>
                </p>
              </div>

              {item.status !== "cancelled" && (
                <button
                  onClick={() => handleCancel(item._id)}
                  className="
bg-red-500
text-white
px-5
py-2
rounded-xl
hover:bg-red-600
transition
"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Reservations;
