import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BASE_URL } from "../helper";

const UserProfileIcon = ({ si }) => (
  <div>
    <FaUser size={si} />
  </div>
);

const Logout = ({ handleLogout, user }) => (
  <div className="flex justify-end ">
    <div className="w-[200px]  h-[200px] text-center p-5 bg-gray-100 border-4 border-blue-200 shadow-2xl mt-[-22px] mr-[65px]  absolute rounded-xl rounded-tr-none ">
      <div className="ml-[46px] h-[65px] w-[65px] mt-[-6px] text-blue-900 rounded-full border-solid border-blue-900   border-4 p-1 cursor-pointer active:border-gray-400 ">
        <UserProfileIcon si={48} />
      </div>
      {user && <h1 className="mt-4 ml-1 mb-3">{user.fullname}</h1>}
      <button
        onClick={handleLogout}
        className="text-sm text-white ml-1 border-2 p-[7px] bg-blue-500 hover:bg-blue-600 hover:shadow-lg active:bg-blue-800 rounded-lg active:border-collapse active:font-semibold active:shadow-2xl"
      >
        LogOut
      </button>
    </div>
  </div>
);

const EmployeeHeader = () => {
  const [showItem, setShowItem] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
        setUser(json.user);
        console.log(json.user);
      } catch (error) {
        if (error.message === "Network response was not ok") navigate("/");
        setError("Error fetching employee data");
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
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        navigate("/"); // Redirect to the login page after successful logout
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <div className="sticky top-0">
        <ul className="flex justify-between px-10 py-4 text-center rounded-b-lg sticky top-0 bg-blue-900">
          <Link to="/employeeHomepage/">
            <li className="active:font-semibold text-white link-underline link-underline-black">
              Home
            </li>
          </Link>
          <Link to="/employeeSalaryDetails/">
            <li className="text-white active:font-semibold link-underline link-underline-black">
              Salary Details
            </li>
          </Link>
          <Link to="/employeeProjectDetails">
            <li className="text-white active:font-semibold link-underline link-underline-black">
              Project Details
            </li>
          </Link>
          <Link to="/employeeProjectReport/">
            <li className="text-white active:font-semibold link-underline link-underline-black">
              Project Report
            </li>
          </Link>
          <Link to="/employeeLeaveReport/">
            <li className="text-white active:font-semibold link-underline link-underline-black">
              Leave Report
            </li>
          </Link>
          <div
            className="h-9 w-10 mt-[-6px] text-white rounded-3xl border-solid border-4 p-1 cursor-pointer active:border-gray-400"
            onClick={() => setShowItem(!showItem)}
          >
            <UserProfileIcon si={25} />
          </div>
        </ul>
        {showItem && <Logout handleLogout={handleLogout} user={user} />}
      </div>
    </div>
  );
};

export default EmployeeHeader;
