import { useState, useRef } from "react";

import { createReservation } from "../../services/reservation.service";

import Layout from "../../components/Layout";

import { toast } from "react-toastify";

function CreateReservation() {
  const startTimeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const endTimeRef = useRef(null);

  const [form, setForm] = useState({
    date: "",

    startTime: "",

    endTime: "",

    guests: 1,
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.date || !form.startTime || !form.endTime) {
      toast.error("Please fill all fields");

      return;
    }

    if (form.startTime >= form.endTime) {
      toast.error("End time must be after start time");

      return;
    }

    try {
      setLoading(true);

      await createReservation({
        ...form,
        guests: Number(form.guests),
      });

      toast.success("Reservation created successfully");

      setForm({
        date: "",
        startTime: "",
        endTime: "",
        guests: 1,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Reservation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className="
      flex
      justify-center
      "
      >
        <div
          className="
        bg-white
        shadow-lg
        rounded-2xl
        p-8
        w-full
        max-w-xl
        border
        "
        >
          {/* HEADER */}

          <div className="mb-8">
            <h1
              className="
            text-3xl
            font-bold
            text-gray-900
            "
            >
              🍽 Book Table
            </h1>

            <p
              className="
            text-gray-500
            mt-2
            "
            >
              Choose your preferred date and time slot
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            {/* DATE */}

            <div>
              <label
                className="
              text-sm
              font-semibold
              text-gray-700
              "
              >
                Reservation Date
              </label>

              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                className="
              mt-2
              border
              p-3
              w-full
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-black
              "
                onChange={(e) =>
                  setForm({
                    ...form,

                    date: e.target.value,
                  })
                }
              />
            </div>

            {/* START TIME */}

            <div>
              <label
                className="
              text-sm
              font-semibold
              text-gray-700
              "
              >
                Start Time
              </label>

              <input
                ref={startTimeRef}
                type="time"
                value={form.startTime}
                className="
              mt-2
              border
              p-3
              w-full
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-black
              "
                onChange={(e) => {
                  setForm({
                    ...form,

                    startTime: e.target.value,

                    endTime: "",
                  });

                  startTimeRef.current.blur();
                }}
              />
            </div>

            {/* END TIME */}

            {form.startTime && (
              <div>
                <label
                  className="
                text-sm
                font-semibold
                text-gray-700
                "
                >
                  End Time
                </label>

                <input
                  ref={endTimeRef}
                  type="time"
                  value={form.endTime}
                  min={form.startTime}
                  className="
                mt-2
                border
                p-3
                w-full
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-black
                "
                  onChange={(e) => {
                    setForm({
                      ...form,

                      endTime: e.target.value,
                    });

                    endTimeRef.current.blur();
                  }}
                />
              </div>
            )}

            {/* GUESTS */}

            <div>
              <label
                className="
              text-sm
              font-semibold
              text-gray-700
              "
              >
                Number of Guests
              </label>

              <input
                type="number"
                min="1"
                value={form.guests}
                className="
              mt-2
              border
              p-3
              w-full
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-black
              "
                onChange={(e) =>
                  setForm({
                    ...form,

                    guests: e.target.value,
                  })
                }
              />
            </div>

            <button
              disabled={loading}
              className="
bg-black
text-white
w-full
py-3
rounded-xl
disabled:bg-gray-400
"
            >
              {loading ? "Booking..." : "Reserve Table"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateReservation;
