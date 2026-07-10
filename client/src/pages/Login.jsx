import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Input from "../components/Input";

import Button from "../components/Button";

import { toast } from "react-toastify";

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",

    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter email and password");

      return;
    }

    try {
      setLoading(true);

      const user = await login(form);

      toast.success("Login successful");

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
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
justify-center
items-center
px-5
"
    >
      <form
        onSubmit={submit}
        className="
bg-white
shadow-xl
rounded-2xl
border
p-8
w-full
max-w-md
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
            Welcome back, login to continue
          </p>
        </div>

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
          {loading ? "Signing in..." : "Login"}
        </Button>

        <p
          className="
text-center
text-sm
text-gray-500
"
        >
          New customer?{" "}
          <Link
            to="/register"
            className="
font-semibold
text-black
hover:underline
"
          >
            Create account
          </Link>
        </p>

        <Link
          to="/"
          className="
block
text-center
text-sm
text-gray-400
hover:text-black
"
        >
          ← Back to home
        </Link>
      </form>
    </div>
  );
}

export default Login;
