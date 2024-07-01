import React, { useRef, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const username = useRef();
  const password = useRef();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handlesubmitform = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/api/v1/admins/login`;

    const data = {
      username: username.current.value,
      password: password.current.value,
    };

    try {
      const response1 = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const responseData = await response1.json();
      if (!response1.ok) {
        console.log(response1.status);
        toast.error(responseData.message);
        //throw new Error("Login failed");
      }
      //console.log(responseData.data.accessToken);

      // Assuming responseData.accessToken contains the access token
      // Set the accessToken cookie
      document.cookie = `accessToken=${responseData.data.accessToken}; Secure; SameSite=None; Path=/`;
      if (responseData.data.user.role === "admin") navigate(`/admin`);
      else navigate(`/employeeHomepage`);
    } catch (error) {
      if (error.message === "Unauthorized request") navigate("/");
      console.log("Login error:", error.message);
      // Handle login error
    }
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      <div
        className="relative flex justify-start items-center h-screen
       bg-[url('https://www.shutterstock.com/shutterstock/photos/2159023891/display_1500/stock-photo-happy-businesspeople-laughing-while-collaborating-on-a-new-project-in-an-office-group-of-diverse-2159023891.jpg')]
       w-full bg-cover bg-center"
      >
        {/* Overlay for transparency */}
        <div className="absolute inset-0 bg-black opacity-50 "></div>
        <div className="relative z-10 flex bg-white bg-opacity-80 shadow-2xl p-10 rounded-lg ml-20 w-3/12">
          <form className="flex flex-col " onSubmit={handlesubmitform}>
            <h1 className="text-3xl  text-blue-900 font-bold mb-6">
              Welcome back!
            </h1>
            <label className="mb-2 text-lg text-blue-900">Username</label>
            <input
              type="text"
              ref={username}
              placeholder="Enter Username"
              className="mb-4 p-3 border-2 border-gray-500 text-md rounded-lg w-[18em]"
            />
            <label className="mb-2 text-lg  text-blue-900">Password</label>
            <input
              type="password"
              ref={password}
              placeholder="Enter Password"
              className="mb-6 p-3 border-2 border-gray-500 text-md rounded-lg"
            />
            {error && (
              <div className="text-red-600 font-bold text-md">{error}</div>
            )}
            <button className="p-3 text-lg text-white bg-blue-500 hover:bg-blue-400 hover:shadow-lg active:bg-blue-600 rounded-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
