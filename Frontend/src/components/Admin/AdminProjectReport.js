import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper";
import Footer from "../footer/Footer";
const AdminProjectReport = () => {
  const [projectReports, setProjectReports] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectReportDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/admins/getProjectReports`,
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
        if (json?.projectReports) {
          setProjectReports(json.projectReports);
          console.log(json.projectReports);
        } else {
          throw new Error("No project Reports field in response");
        }
      } catch (error) {
        if (error.message === "Network response was not ok") navigate("/");
        setError("Error fetching project Reports data");
      }
    };

    fetchProjectReportDetails();
  }, [navigate]);
  return (
    <div>
      <AdminHeader />
      <div className="p-2">
        <div className=" h-[570px] rounded-t-2xl m-auto  mt-6 p-1">
          <div className="bg-blue-900 p-3 rounded-t-2xl text-center">
            <h1 className="text-white font-bold text-xl">PROJECT REPORT</h1>
          </div>
          <div className="bg-gray-200 text-black p-2  font-bold flex justify-between ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>

                  <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {projectReports.map((report) => {
                  return (
                    <tr className="bg-gray-200  border-b-2 border-white  hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-no-wrap font-normal text-center">
                        {report.project}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap font-normal text-center">
                        {report.user}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap font-normal text-center">
                        {report.report}
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
      <Footer />
    </div>
  );
};

export default AdminProjectReport;
