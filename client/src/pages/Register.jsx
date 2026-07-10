import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Input from "../components/Input";

import Button from "../components/Button";

import { toast } from "react-toastify";

function Register() {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",

    email: "",

    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");

      return;
    }

    try {
      setLoading(true);

      await register(form);

      toast.success("Account created successfully");

      navigate("/customer/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
min-h-screen
bg-gray-50
flex
items-center
justify-center
px-5
"
    >
      <form
        onSubmit={submit}
        className="
bg-white
shadow-xl
rounded-2xl
p-8
w-full
max-w-md
border
space-y-5
"
      >
        {/* HEADER */}

        <div
          className="
text-center
mb-6
"
        >
          <h1
            className="
text-3xl
font-bold
"
          >
            🍽 ReserveBite
          </h1>

          <p
            className="
text-gray-500
mt-2
"
          >
            Create your customer account
          </p>
        </div>

        <Input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,

              name: e.target.value,
            })
          }
        />

        <Input
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,

              email: e.target.value,
            })
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,

              password: e.target.value,
            })
          }
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <p
          className="
text-center
text-sm
text-gray-500
"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="
text-black
font-semibold
hover:underline
"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
