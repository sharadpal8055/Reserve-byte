import { useEffect, useState } from "react";

import {
  getTables,
  createTable,
  deleteTable,
} from "../../services/admin.service";

import Layout from "../../components/Layout";

import { toast } from "react-toastify";

function Tables() {
  const [tables, setTables] = useState([]);

  const [form, setForm] = useState({
    tableNumber: "",

    capacity: "",
  });

  const load = async () => {
    try {
      const res = await getTables();

      setTables(res.data.tables || []);
    } catch (error) {
      toast.error("Failed to load tables");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.tableNumber || !form.capacity) {
      toast.error("Please fill all fields");

      return;
    }

    try {
      await createTable({
        tableNumber: Number(form.tableNumber),

        capacity: Number(form.capacity),
      });

      toast.success("Table added successfully");

      setForm({
        tableNumber: "",

        capacity: "",
      });

      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add table");
    }
  };

  const removeTable = async (id) => {
    const confirm = window.confirm("Delete this table?");

    if (!confirm) return;

    try {
      await deleteTable(id);

      toast.success("Table deleted");

      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
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
          🍽 Restaurant Tables
        </h1>

        <p
          className="
text-gray-500
mt-2
"
        >
          Manage seating capacity and restaurant tables
        </p>
      </div>

      {/* CREATE FORM */}

      <form
        onSubmit={submit}
        className="
bg-white
border
shadow
rounded-2xl
p-6
flex
flex-wrap
gap-5
items-center
mb-10
"
      >
        <input
          value={form.tableNumber}
          placeholder="Table Number"
          className="
border
rounded-xl
px-5
py-3
outline-none
focus:ring-2
focus:ring-black
"
          onChange={(e) =>
            setForm({
              ...form,

              tableNumber: e.target.value,
            })
          }
        />

        <input
          value={form.capacity}
          placeholder="Guest Capacity"
          className="
border
rounded-xl
px-5
py-3
outline-none
focus:ring-2
focus:ring-black
"
          onChange={(e) =>
            setForm({
              ...form,

              capacity: e.target.value,
            })
          }
        />

        <button
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
          Add Table
        </button>
      </form>

      {/* EMPTY */}

      {tables.length === 0 && (
        <div
          className="
bg-white
shadow
rounded-2xl
p-10
text-center
text-gray-500
"
        >
          No tables configured yet
        </div>
      )}

      {/* TABLE LIST */}

      <div
        className="
grid
grid-cols-1
md:grid-cols-3
gap-6
"
      >
        {tables.map((table) => (
          <div
            key={table._id}
            className="
bg-white
border
shadow
rounded-2xl
p-6
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
"
            >
              Table {table.tableNumber}
            </h2>

            <p
              className="
text-gray-500
mt-3
"
            >
              👥 Capacity:{" "}
              <span className="font-semibold">{table.capacity}</span> Guests
            </p>

            <button
              onClick={() => removeTable(table._id)}
              className="
mt-6
bg-red-500
text-white
px-5
py-2
rounded-xl
hover:bg-red-600
transition
"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Tables;
