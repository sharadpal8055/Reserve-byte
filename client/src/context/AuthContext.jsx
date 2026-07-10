import { createContext, useContext, useState } from "react";

import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // REGISTER

  const register = async (data) => {
    const res = await api.post(
      "/auth/register",

      data,
    );

    setUser(res.data.user);

    localStorage.setItem(
      "user",

      JSON.stringify(res.data.user),
    );
  };

  // LOGIN

  const login = async (data) => {
    const res = await api.post(
      "/auth/login",

      data,
    );

    setUser(res.data.user);

    localStorage.setItem(
      "user",

      JSON.stringify(res.data.user),
    );
    return res.data.user;
  };

  // LOGOUT

  const logout = async () => {
    await api.post("/auth/logout");

    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        login,

        register,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
