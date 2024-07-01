import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/Footer";

const AdminLeaveReport = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveReports = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/admins/getLeaveReports`,
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
        setLeaves(json.LeaveReports);
      } catch (error) {
        if (error.message === "Network response was not ok") navigate("/");
        setError("Error fetching leave data");
      }
    };

    fetchLeaveReports();
  }, [navigate]);

  const handleStatusSubmit = async (leaveId, user, status) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/admins/updateLeaveReport`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user,
            status: status,
            leaveId: leaveId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Status updated successfully");
      // Optionally, update the state to reflect the changes without reloading
      setLeaves((prevLeaves) =>
        prevLeaves.map((leave) =>
          leave._id === leaveId ? { ...leave, status: status } : leave
        )
      );
    } catch (error) {
      console.log(error);
      setError("Error updating leave status");
    }
  };

  return (
    <div>
      <ToastContainer />
      <AdminHeader />
      <div className="p-2 mb-[600px]">
        <div className="bg-gray-100 h-[500px] m-auto mt-6">
          <div className="bg-blue-900 p-3 rounded-t-2xl text-center">
            <h1 className="text-white font-bold text-xl">LEAVE REQUESTS</h1>
          </div>
          <div className="bg-gray-200 text-black p-2 font-bold flex justify-between">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
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
                {leaves.map((leave) => (
                  <tr
                    key={leave._id}
                    className=" bg-gray-200  border-b-2 border-white  hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 whitespace-no-wrap font-normal">
                      {leave.user}
                    </td>
                    <td className="px-5 py-4 whitespace-no-wrap font-normal">
                      {new Date(leave.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 whitespace-no-wrap font-normal">
                      {new Date(leave.fromDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 whitespace-no-wrap font-normal">
                      {new Date(leave.toDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 whitespace-no-wrap font-normal">
                      {leave.reason}
                    </td>
                    <td className="px-5 py-4 whitespace-no-wrap font-normal">
                      <select
                        className="p-1 rounded-md"
                        defaultValue={leave.status}
                        onChange={(e) =>
                          handleStatusSubmit(
                            leave._id,
                            leave.user,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approve</option>
                        <option value="Declined">Decline</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {error && (
            <div className="bg-red-200 text-red-700 p-2 mt-2 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLeaveReport;
