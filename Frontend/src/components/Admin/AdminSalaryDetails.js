import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/Footer";
const AdminSalaryDetails = () => {
  const [salaries, setSalaries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalaryDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/admins/getSalarees`, {
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
        if (json?.salarees) {
          setSalaries(json.salarees);
        } else {
          throw new Error("No Salary field in response");
        }
      } catch (error) {
        if (error.message === "Network response was not ok") navigate("/");
        setError("Error fetching Salaries data");
      }
    };

    fetchSalaryDetails();
  }, [navigate]);

  const handleDeleteSalary = async (salaryId) => {
    const url = `${BASE_URL}/api/v1/admins/deleteSalary`;
    const data = {
      salaryId: salaryId,
    };

    const salarydetails = JSON.stringify(data);

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: salarydetails,
      });

      const data2 = await response.json();
      if (!response.ok) {
        console.log(data2);
        setError(data2?.message);
      } else {
        toast.success("Salary Deleted Successfully");
        // Remove the deleted employee from the state
        setSalaries((prevsalarees) =>
          prevsalarees.filter((salary) => salary._id !== salaryId)
        );
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError("Error submitting employee data");
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <AdminHeader />
      <ToastContainer />
      <div className="p-2">
        <div className="bg-gray-50 h-[570px] rounded-t-2xl m-auto mt-6 p-1">
          <div className="bg-blue-900 p-3 rounded-t-2xl text-center">
            <h1 className="text-white font-bold text-xl text-center">
              SALARY DETAILS
            </h1>
          </div>
          {error ? (
            <div className="bg-red-500 text-white p-3 rounded-t-2xl text-center">
              <h2 className="text-white font-bold text-xl text-center">
                {error}
              </h2>
            </div>
          ) : (
            <div className="bg-gray-200 text-black p-2 font-bold flex justify-between">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-center bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-center bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Salary Amount
                    </th>
                    <th className="px-6 py-3 text-center bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-center bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Credited On
                    </th>
                    <th className="px-6 py-3 text-center  bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salaries.length > 0 ? (
                    salaries.map((salary) => (
                      <tr
                        key={salary._id}
                        className="bg-gray-200  border-b-2 border-white  hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-no-wrap font-normal text-center">
                          {salary.user}
                        </td>
                        <td className="px-5 py-4 whitespace-no-wrap font-normal text-center">
                          {salary.salaryAmount}
                        </td>
                        <td className="px-5 py-4 whitespace-no-wrap font-normal text-center">
                          {salary.month}
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap font-normal text-center">
                          {formatDate(salary.createdAt)}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteSalary(salary._id)}
                            className=" text-center"
                          >
                            <AiTwotoneDelete className="ml-52 w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 whitespace-no-wrap text-center font-normal"
                      >
                        No salaries available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSalaryDetails;
