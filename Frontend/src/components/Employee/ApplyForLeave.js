import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";

const ApplyForLeave = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/api/v1/users/addLeaveReport`;
    const data = {
      fromDate: fromDate,
      toDate: toDate,
      reason: reason,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Leave added successfully");
      const responseData = await response.json();
      console.log(responseData);
      navigate("/employeeLeaveReport");

      // Assuming responseData.accessToken contains the access token
      document.cookie = `accessToken=${responseData.data.accessToken}; Secure; SameSite=None; Path=/`;

      // Reset form fields to their default values
      setFromDate("");
      setToDate("");
      setReason("");
    } catch (error) {
      if (error.message === "Network response was not ok") navigate("/");
      console.error("Submission error:", error);
      // Handle submission error
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-2 m-2 mr-[-1px] bg-blue-900 rounded-lg mt-3">
        <h1 className="font-semibold text-white text-lg">Request for Leave</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group ml-[75px] mt-3">
            <label htmlFor="fromDate" className="text-sm">
              From Date:
            </label>
            <input
              className="ml-[10px]"
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group ml-[75px] mt-3">
            <label htmlFor="toDate" className="text-sm">
              To Date:
            </label>
            <input
              className="ml-7"
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group ml-[75px] mt-3">
            <label htmlFor="reason" className="text-sm">
              Reason:
            </label>
            <textarea
              className="ml-4 p-2"
              id="reason"
              value={reason}
              rows="3"
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-[100px] h-10 rounded-lg ml-[130px] mt-6 text-white hover:bg-blue-600 hover:shadow-lg active:bg-blue-700 active:border-collapse active:font-semibold active:shadow-2xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForLeave;
