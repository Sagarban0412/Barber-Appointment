"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });
  const { name, password } = loginData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoggedIn(true);
      await axios.post("/api/admin", loginData);
      // console.log(res.data);
      router.push("/admin/dashboard");
    } catch (error) {
      console.log("error message:" + error.message);
    } finally {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="flex-1/2 flex-col bg-white text-black flex justify-center items-center w-1/2">
        <div className="text-center space-y-10">
          <h1 className="font-bold text-6xl">Admin Login</h1>
          <p className="font-semibold text-xl">Welcome back, Admin!</p>
        </div>
        <form className="w-2/3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mt-4">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Username"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300"
            >
              {isLoggedIn ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
      <div
        className={`bg-[url('/Adminlogin.png')] bg-cover bg-center bg-no-repeat flex-1/2 hidden md:flex`}
      ></div>
    </div>
  );
};

export default page;
