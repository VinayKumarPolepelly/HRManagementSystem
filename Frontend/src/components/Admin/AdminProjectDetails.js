import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper";
import Footer from "../footer/Footer";

const AdminProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/admins/getProjects`, {
          method: "GET",
          credentials: "include", // Include credentials (cookies)
          headers: {
            "Content-Type": "application/json",
          },
        });
        //console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        if (json?.projects) {
          setProjects(json.projects);
          console.log(json.projects);
        } else {
          throw new Error("No projects field in response");
        }
      } catch (error) {
        //console.log(error.message);
        if (error.message === "Network response was not ok") navigate("/");
        setError("Error fetching project data");
      }
    };

    fetchProjectDetails();
  }, [navigate]);

  return (
    <div>
      <AdminHeader />
      <div className="p-2">
        <div className="bg-gray-50 rounded-t-2xl m-auto mt-6 p-1">
          <div className="bg-blue-900 p-3 rounded-t-2xl text-center">
            <h1 className="text-white font-bold text-xl">PROJECT DETAILS</h1>
          </div>
          <div className="bg-gray-200 text-black p-2 font-bold flex justify-between overflow-x-visible">
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Project Title
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Project Type
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Developing Platform
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Database Used
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Project Description
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <tr
                        key={project._id}
                        className="bg-gray-200  border-b-2 border-white  hover:bg-gray-100"
                      >
                        <td className="px-6 py-3 w-1/12 whitespace-wrap break-all font-normal text-center">
                          {project.projectTitle}
                        </td>
                        <td className="px-6 py-3 w-1/12 whitespace-wrap break-all font-normal text-center">
                          {project.clientName}
                        </td>
                        <td className="px-6 py-3 w-1/12 whitespace-wrap break-all font-normal text-center">
                          {project.projectType}
                        </td>
                        <td className="px-6 py-3 w-1/12 whitespace-wrap break-all font-normal text-center">
                          {project.developingPlatform}
                        </td>
                        <td className="px-6 py-3 w-1/12 whitespace-wrap break-all font-normal text-center">
                          {project.databaseTechnology}
                        </td>
                        <td className="px-6 py-3 w-3/12 whitespace-wrap break-all font-normal text-center">
                          {project.projectDescription}
                        </td>
                        <td className="px-6 py-3 w-1/12 whitespace-wrap break-all font-normal text-center">
                          {project.projectManager}
                        </td>
                        <td className="px-6 py-3 w-1/12 whitespace-wrap break-all font-normal text-center">
                          <div className="flex justify-center items-center">
                            <Link to={`/admin/editProject/${project._id}`}>
                              <button className="mx-3 text-blue-500 hover:text-blue-700  hover:underline ">
                                Edit
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-4 whitespace-no-wrap text-center font-normal"
                      >
                        No projects available.
                      </td>
                    </tr>
                  )}
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

export default AdminProjectDetails;
