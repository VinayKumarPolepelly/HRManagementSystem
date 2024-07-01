import React, { useEffect, useRef, useState } from "react";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { BASE_URL } from "../helper";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/Footer";

const AdminAddProject = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [error, setError] = useState(null); // Add state for error
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/admins/getEmployees`, {
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
        setEmployees(json);
      } catch (error) {
        if (error.message === "Network response was not ok") navigate("/");
        setError("Error fetching employee data"); // Set error message
      }
    };

    fetchEmployeeDetails();
  }, [navigate]);

  const projectTitle = useRef();
  const clientName = useRef();
  const projectType = useRef();
  const developingPlatform = useRef();
  const databaseTechnology = useRef();
  const projectDescription = useRef();

  const resetForm = () => {
    projectTitle.current.value = "";
    clientName.current.value = "";
    projectType.current.value = "";
    developingPlatform.current.value = "";
    databaseTechnology.current.value = "";
    projectDescription.current.value = "";
    setSelectedEmployees([]);
    setError(null); // Reset error state
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before new submission

    // Client-side validation
    if (
      !projectTitle.current.value ||
      !clientName.current.value ||
      !projectType.current.value ||
      !selectedEmployees.length ||
      !developingPlatform.current.value ||
      !databaseTechnology.current.value ||
      !projectDescription.current.value
    ) {
      setError("All fields are required.");
      return;
    }

    const url = `${BASE_URL}/api/v1/admins/addProject`;

    for (const employee of selectedEmployees) {
      const data = {
        projectTitle: projectTitle.current.value,
        clientName: clientName.current.value,
        projectType: projectType.current.value,
        developingPlatform: developingPlatform.current.value,
        databaseTechnology: databaseTechnology.current.value,
        projectDescription: projectDescription.current.value,
        projectManager: employee.value,
      };

      const projectDetails = JSON.stringify(data);

      try {
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: projectDetails,
        });

        if (!response.ok) {
          const data2 = await response.json();
          console.log("Response not OK:", data2);
          throw new Error(data2?.message || "Error submitting project data");
        }

        const data2 = await response.json();
        console.log("Response OK:", data2);

        toast.success("Project(s) added successfully");
        resetForm();
      } catch (error) {
        console.error("Submit error:", error);
        setError(error.message);
        toast.error(error.message);
      }
    }
  };

  const employeeOptions = employees.map((employee) => ({
    value: employee.username,
    label: employee.username,
  }));

  return (
    <div>
      <ToastContainer />
      <AdminHeader />
      <div className="bg-white min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-center text-blue-500 text-2xl font-bold mb-5">
            ADD PROJECT
          </h1>
          <form onSubmit={handleSubmitForm}>
            <div className="flex flex-col mb-4">
              <label className="text-black font-bold mb-2">Project Name</label>
              <input
                ref={projectTitle}
                type="text"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-black font-bold mb-2">Project Type</label>
              <input
                ref={projectType}
                type="text"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-black font-bold mb-2">Client Name</label>
              <input
                ref={clientName}
                type="text"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-black font-bold mb-2">
                Project Manager
              </label>
              <Select
                isMulti
                name="projectManagers"
                options={employeeOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={selectedEmployees}
                onChange={setSelectedEmployees}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-black font-bold mb-2">
                Developing Platform
              </label>
              <input
                ref={developingPlatform}
                type="text"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-black font-bold mb-2">
                Database Technology
              </label>
              <input
                ref={databaseTechnology}
                type="text"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-black font-bold mb-2">
                Project Description
              </label>
              <textarea
                ref={projectDescription}
                rows="4"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            {error && (
              <div className="text-red-500 font-bold text-center mb-4">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminAddProject;
