"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/header/header";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form className="flex flex-col gap-6 p-10 rounded-2xl bg-white shadow-md w-96 border border-gray-300">
          <p className="text-center text-gray-800 text-xl">Login</p>

          <div className="flex items-center gap-3 p-3 rounded-full bg-gray-100 shadow-inner">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
            </svg>
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none text-gray-800 w-full"
              autoComplete="off"
            />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-full bg-gray-100 shadow-inner">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent outline-none text-gray-800 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-600 hover:text-black"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.06 10.06 0 012.362-3.568m3.548-2.214A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.965 9.965 0 01-1.308 2.572M15 12a3 3 0 01-3 3m0-6a3 3 0 013 3m-3 3a2.99 2.99 0 01-2.12-.879M4 4l16 16"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-black py-2 rounded transition"
            >
              Login
            </button>
            <button
              type="button"
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-black py-2 rounded transition"
            >
              Sign Up
            </button>
          </div>

          <button
            type="button"
            className="w-full bg-gray-200 hover:bg-red-500 hover:text-white text-black py-2 rounded transition"
          >
            Forgot Password
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
