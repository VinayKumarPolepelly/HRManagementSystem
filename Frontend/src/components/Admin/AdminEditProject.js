import React, { useEffect, useRef, useState } from "react";
import AdminHeader from "./AdminHeader";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { BASE_URL } from "../helper";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";

const AdminEditProject = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [error, setError] = useState(null); // Add state for error
  const [project, setProject] = useState([]); // Add state for project
  const navigate = useNavigate();

  const projectTitle = useRef();
  const clientName = useRef();
  const projectType = useRef();
  const developingPlatform = useRef();
  const databaseTechnology = useRef();
  const projectDescription = useRef();

  const { projectId } = useParams();

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

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/admins/single-project/${projectId}`,
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
        setProject(json.project);
        setSelectedEmployees(
          json.project.projectManagers.map((manager) => ({
            value: manager,
            label: manager,
          }))
        );
      } catch (error) {
        console.log("Error fetching project data"); // Set error message
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    if (project) {
      projectTitle.current.value = project.projectTitle || "";
      clientName.current.value = project.clientName || "";
      projectType.current.value = project.projectType || "";
      developingPlatform.current.value = project.developingPlatform || "";
      databaseTechnology.current.value = project.databaseTechnology || "";
      projectDescription.current.value = project.projectDescription || "";
    }
  }, [project]);

  const resetForm = () => {
    projectTitle.current.value = "";
    clientName.current.value = "";
    projectType.current.value = "";
    developingPlatform.current.value = "";
    databaseTechnology.current.value = "";
    projectDescription.current.value = "";
    setSelectedEmployees([]);
  };

  const handlesubmitform = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/api/v1/admins/updateproject/${projectId}`;
    let submissionError = null;

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
      console.log(projectDetails);

      try {
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: projectDetails,
        });

        const data2 = await response.json();
        if (!response.ok) {
          console.log(data2);
          submissionError = data2?.message;
          setError(submissionError);
        } else {
          toast.success("Project updated successfully");
          setTimeout(() => {
            navigate("/admin/projectdetails");
          }, 1000);
          resetForm();
        }
      } catch (error) {
        console.error("Submit error:", error);
        submissionError = "Error submitting project data";
        setError(submissionError);
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
      <div className="bg-white h-[100vh]">
        <h1 className="text-center text-white text-xl font-bold py-5">
          EDIT PROJECT
        </h1>
        <form onSubmit={handlesubmitform}>
          <div className="flex flex-row m-4 flex-wrap">
            <div className="px-8 py-5">
              <div className="flex flex-col">
                <label className="text-black pl-1 py-2">Project Name</label>
                <input
                  ref={projectTitle}
                  type="text"
                  className="w-[40vw] h-[40px] rounded-md border border-gray-900 px-2"
                />
              </div>
              <div className="flex flex-col my-5">
                <label className="text-black pl-1 py-2">Project Type</label>
                <input
                  ref={clientName}
                  type="text"
                  className="w-[40vw] h-[40px] rounded-md border border-gray-900 px-2"
                />
              </div>
              <div className="flex flex-col my-5">
                <label className="text-black pl-1 py-2 ">Client Name</label>
                <input
                  ref={projectType}
                  type="text"
                  className="w-[40vw] h-[40px] rounded-md border border-gray-900 px-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black pl-1 py-2">Project Manager</label>
                <Select
                  isMulti
                  name="projectManagers"
                  options={employeeOptions}
                  className="basic-multi-select border border-gray-900 rounded-md"
                  classNamePrefix="select"
                  value={selectedEmployees}
                  onChange={setSelectedEmployees}
                />
              </div>
            </div>
            <div className="pl-32 py-5">
              <div className="flex flex-col">
                <label className="text-black pl-1 py-2">
                  Developing Platform
                </label>
                <input
                  ref={developingPlatform}
                  type="text"
                  className="w-[40vw] h-[40px] rounded-md border border-gray-900 px-2"
                />
              </div>
              <div className="flex flex-col my-5">
                <label className="text-black pl-1 py-2">
                  Database Technology
                </label>
                <input
                  ref={databaseTechnology}
                  type="text"
                  className="w-[40vw] h-[40px] rounded-md border border-gray-900 px-2"
                />
              </div>
              <div className="flex flex-col my-5">
                <label className="text-black pl-1 py-2">
                  Project Description
                </label>
                <input
                  ref={projectDescription}
                  type="text"
                  className="w-[40vw] h-[120px] rounded-md border border-gray-900 px-2"
                />
              </div>
            </div>
          </div>
          {error && (
            <div className="text-red-500 font-bold text-center mt-0">
              {error}
            </div>
          )}
          <button className="mx-[46%] w-28 mt-0 text-center text-white h-[34px] bg-violet-500 mr-5 hover:bg-violet-600 hover:shadow-lg active:bg-violet-700 rounded-lg active:font-semibold active:shadow-2xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProject;
