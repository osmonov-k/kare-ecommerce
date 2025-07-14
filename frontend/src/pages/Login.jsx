import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [authMode, setAuthMode] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "user@gmail.com",
    password: "123123123",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint =
        authMode === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const payload =
        authMode === "Sign Up"
          ? formData
          : {
              email: formData.email,
              password: formData.password,
            };

      const response = await axios.post(backendUrl + endpoint, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(
          `Successfully ${authMode === "Login" ? "signed in" : "registered"}`
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token, setToken]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      aria-label="Authentication form"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <h1 className="prata-regular text-3xl">{authMode}</h1>
        <hr
          className="border-none h-[1.5px] w-8 bg-gray-800"
          aria-hidden="true"
        />
      </div>

      {authMode === "Sign Up" && (
        <input
          onChange={handleInputChange}
          value={formData.name}
          name="name"
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Full Name"
          required
          autoComplete="name"
        />
      )}

      <input
        onChange={handleInputChange}
        value={formData.email}
        name="email"
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email Address"
        required
        autoComplete="email"
      />

      <input
        onChange={handleInputChange}
        value={formData.password}
        name="password"
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        autoComplete={
          authMode === "Login" ? "current-password" : "new-password"
        }
        minLength={6}
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <button
          type="button"
          className="cursor-pointer hover:underline"
          onClick={() => toast.info("Password reset functionality coming soon")}
        >
          Forgot your password?
        </button>

        <button
          type="button"
          onClick={() =>
            setAuthMode((prev) => (prev === "Login" ? "Sign Up" : "Login"))
          }
          className="cursor-pointer hover:underline"
        >
          {authMode === "Login" ? "Create account" : "Login here"}
        </button>
      </div>

      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer hover:bg-gray-800 transition-colors"
      >
        {authMode === "Login" ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
};

export default Login;
