import React, { useEffect, useState } from "react";
import EmployeeHeader from "./EmployeeHeader";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper";
import Footer from "../footer/Footer";

const SalaryDetails = () => {
  const [salary, setSalary] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalaryDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/users/getSalareeDetails`,
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
        console.log(json);
        if (json?.salarees) {
          setSalary(json.salarees);
          //console.log(json.salarees);
        } else {
          throw new Error("No salaries field in response");
        }
      } catch (error) {
        //if (error.message === "Network response was not ok") navigate("/");
        console.log(error);
        setError("Error fetching project data");
      }
    };

    fetchSalaryDetails();
  }, [navigate]);

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
      <EmployeeHeader />
      <div className="p-2">
        <div className="bg-gray-50 h-[570px] m-auto mt-6 p-1">
          <div className="bg-blue-900 p-3 rounded-t-2xl text-center">
            <h1 className="text-white font-bold text-xl">SALARY DETAILS</h1>
          </div>
          <div className="bg-gray-200 text-black p-2 font-bold flex justify-between">
            {error ? (
              <p>{error}</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Salary amount
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Credited on
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salary.map((salaree) => (
                    <tr
                      key={salaree._id}
                      className="bg-gray-200  border-b-2 border-white  hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-no-wrap font-normal">
                        {salaree.salaryAmount}
                      </td>
                      <td className="px-5 py-4 whitespace-no-wrap font-normal">
                        {salaree.month}
                      </td>
                      <td className="px-5 py-4 whitespace-no-wrap font-normal">
                        {formatDate(salaree.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SalaryDetails;
