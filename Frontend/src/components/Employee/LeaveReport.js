import React, { useEffect, useState } from "react";
import EmployeeHeader from "./EmployeeHeader";
import ApplyForLeave from "./ApplyForLeave";

import { BASE_URL } from "../helper";
import Footer from "../footer/Footer";

const LeaveReport = () => {
  const [showItem, setShowItem] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  const handlerClick = () => {
    setShowItem(true);
  };

  useEffect(() => {
    fetchLeaves();
  }, [leaves]); // Re-fetch leave details when formSubmitted changes

  const fetchLeaves = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/users/getLeaveDetails`, {
        method: "GET",
        credentials: "include", // Include credentials (cookies)
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      if (json?.leaves) {
        setLeaves(json.leaves);
        console.log(json.leaves);
      } else {
        throw new Error("No Leaves field in response");
      }
    } catch (error) {
      setError("Error fetching Leaves data");
    }
  };

  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div>
        <EmployeeHeader />
        <div className="mt-4">
          <h1 className="text-xl font-bold m-3 mt-5 ml-4">Leave Dashboard</h1>
          <div className="flex ">
            <div className="bg-gray-50 pr-2 pt-2 pb-3 w-4/12 rounded-2xl ml-3">
              <div className="flex p-3 border-4 border-gray-300 px-5 ml-3">
                <div className="border-black p-2">
                  <div className="bg-green-300 p-2 w-11 text-center rounded-md">
                    <h1 className="text-white font-bold text-2xl" id="daysLeft">
                      6
                    </h1>
                  </div>
                  <h2 className="text-gray-700 font-semibold text-sm ml-1">
                    Days
                  </h2>
                </div>
                <h1 className="mt-5 text-lg font-medium ml-9">
                  Available Leaves
                </h1>
                <div>
                  <button
                    className="bg-blue-500 w-[100px] h-10 rounded-lg ml-[50px] mt-4 text-white hover:bg-blue-600 hover:shadow-lg active:bg-blue-700 active:border-collapse active:font-semibold active:shadow-2xl"
                    onClick={handlerClick}
                  >
                    Apply
                  </button>
                </div>
              </div>
              {showItem && (
                <ApplyForLeave
                  onFormSubmit={() => setFormSubmitted(!formSubmitted)} // Toggle formSubmitted on form submission
                />
              )}
            </div>
            <div className="bg-gray-50 w-8/12 h-[530px] ml-2 mr-2 rounded-t-2xl">
              <div className="bg-blue-900 p-3 rounded-t-2xl text-center">
                <h1 className="text-white font-bold text-xl">LEAVE HISTORY</h1>
              </div>
              <div className="bg-gray-200 text-black p-2 font-bold flex justify-between">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Requested On
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        From
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        To
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {leaves.map((leave) => {
                      return (
                        <tr
                          key={leave._id}
                          className="bg-gray-100  border-b-2 border-white  hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-no-wrap">
                            {formatDateAndTime(leave.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap">
                            {formatDate(leave.fromDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap">
                            {formatDate(leave.toDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap">
                            {leave.reason}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap">
                            {leave.status}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {error && <div>{error}</div>}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LeaveReport;
