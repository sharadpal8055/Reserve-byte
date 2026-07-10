import { useEffect, useState } from "react";

import {
  getMyReservations,
  cancelReservation,
} from "../../services/reservation.service";

import Layout from "../../components/Layout";

import { toast } from "react-toastify";

function MyReservations() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  // LOAD RESERVATIONS

  const load = async () => {
    try {
      setLoading(true);

      const res = await getMyReservations();

      setData(res.data.reservations || []);
    } catch (error) {
      toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // CANCEL RESERVATION

  const cancel = async (id) => {
    const confirmCancel = window.confirm("Cancel this reservation?");

    if (!confirmCancel) return;

    try {
      await cancelReservation(id);

      toast.success("Reservation cancelled");

      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <Layout>
      <div
        className="
flex
justify-between
items-center
mb-8
"
      >
        <div>
          <h1
            className="
text-3xl
font-bold
"
          >
            My Reservations
          </h1>

          <p
            className="
text-gray-500
mt-1
"
          >
            View and manage your bookings
          </p>
        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div
          className="
bg-white
shadow
rounded-xl
p-8
text-center
"
        >
          Loading reservations...
        </div>
      )}

      {/* EMPTY */}

      {!loading && data.length === 0 && (
        <div
          className="
bg-white
shadow
rounded-xl
p-10
text-center
"
        >
          <h2
            className="
text-xl
font-bold
"
          >
            No reservations yet
          </h2>

          <p
            className="
text-gray-500
mt-2
"
          >
            Your booked tables will appear here
          </p>
        </div>
      )}

      {/* LIST */}

      <div
        className="
grid
gap-5
"
      >
        {!loading &&
          data.map((item) => (
            <div
              key={item._id}
              className="
bg-white
shadow
rounded-xl
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
                  📅
                  <span className="font-medium">Date:</span> {item.date}
                </p>

                <p>
                  ⏰<span className="font-medium">Time:</span> {item.startTime}-
                  {item.endTime}
                </p>

                <p>
                  👥
                  <span className="font-medium">Guests:</span> {item.guests}
                </p>

                <p>
                  🍽
                  <span className="font-medium">Table:</span>{" "}
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
                  onClick={() => cancel(item._id)}
                  className="
bg-red-500
hover:bg-red-600
text-white
px-5
py-2
rounded-lg
"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default MyReservations;
