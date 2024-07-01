import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BASE_URL } from "../helper";

const UserProfileIcon = ({ size }) => (
  <div>
    <FaUser size={size} />
  </div>
);

const AdminHeader = () => {
  const [showItem, setShowItem] = useState(false);
  const navigate = useNavigate();
  const [user1, setUser1] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/users/getUserDetails`,
          {
            method: "GET",
            credentials: "include", // Include credentials (cookies)
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setUser1(json.user);
        console.log(json.user); // Changed this line to correctly log the fetched user data
      } catch (error) {
        if (error.message === "Network response was not ok") navigate("/");
        setError("Error fetching employee data"); // Set error message
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/Adminlogin"); // Redirect to the login page after successful logout
      } else {
        console.log(response);
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      if (error.message === "Network response was not ok") navigate("/");
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="sticky top-0 bg-blue-900 shadow-lg">
      <ul className="flex justify-between items-center border-b rounded-b-lg text-white">
        <Link to="/admin">
          <li className="m-5 active:font-semibold link-underline link-underline-black">
            Home
          </li>
        </Link>
        <Link to="/admin/employees">
          <li className="m-5 active:font-semibold link-underline link-underline-black">
            Employees
          </li>
        </Link>
        <Link to="/admin/addsalary">
          <li className="m-5 active:font-semibold link-underline link-underline-black">
            Add Salary
          </li>
        </Link>
        <Link to="/admin/addproject">
          <li className="m-5 active:font-semibold link-underline link-underline-black">
            Add Project
          </li>
        </Link>
        <Link to="/admin/salarydetails">
          <li className="m-5 active:font-semibold link-underline link-underline-black">
            Salary Details
          </li>
        </Link>
        <Link to="/admin/projectdetails">
          <li className="m-5 active:font-semibold link-underline link-underline-black">
            Project Details
          </li>
        </Link>
        <Link to="/admin/projectreport">
          <li className="m-5 active:font-semibold link-underline link-underline-black">
            Project Report
          </li>
        </Link>
        <Link to="/admin/leavereport">
          <li className="m-5 active:font-semibold link-underline link-underline-black">
            Leave Reports
          </li>
        </Link>
        <li className="relative">
          <div
            className="h-9 w-10 mt-3 mr-5 text-white rounded-3xl border-solid border-4 p-1 cursor-pointer active:text-violet-200 active:border-violet-200"
            onClick={() => setShowItem(!showItem)}
          >
            <UserProfileIcon size={25} />
          </div>
          {showItem && user1 && (
            <Logout user1={user1} handleLogout={handleLogout} />
          )}
        </li>
      </ul>
    </div>
  );
};

const Logout = ({ user1, handleLogout }) => (
  <div className="absolute top-12 right-0 mt-2 mr-5">
    <div className="w-48 text-center p-5 bg-gray-100 border-4 border-violet-200 shadow-2xl rounded-xl rounded-tr-none">
      <div className="mx-auto h-16 w-16 text-blue-900 rounded-full border-4 border-blue-900 p-1 cursor-pointer active:border-gray-400">
        <UserProfileIcon size={48} />
      </div>
      <h1 className="mt-4 mb-3 text-blue-900">{user1.fullname}</h1>
      <button
        onClick={handleLogout}
        className="text-sm text-white border-2 p-2 bg-blue-500 hover:bg-blue-600  active:bg-blue-800  hover:shadow-lg active:border-blue-700 rounded-lg"
      >
        Logout
      </button>
    </div>
  </div>
);

export default AdminHeader;
