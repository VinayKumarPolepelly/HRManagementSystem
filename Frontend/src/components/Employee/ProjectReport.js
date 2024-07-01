import React, { useEffect, useRef } from 'react'
import EmployeeHeader from './EmployeeHeader'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../helper'
import { toast, ToastContainer } from 'react-toastify' // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../footer/Footer'

const ProjectReport = () => {
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/users/getProjectDetails`,
          {
            method: 'GET',
            credentials: 'include', // Include credentials (cookies)
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const json = await response.json()
        if (json?.projects) {
          setProjects(json.projects)
          console.log(json.projects)
        } else {
          throw new Error('No projects field in response')
        }
      } catch (error) {
        // if (error.message === "Network response was not ok") navigate("/");
        setError('Error fetching project data')
      }
    }

    fetchProjectDetails()
  }, [navigate])

  const project = useRef()
  const report = useRef()

  const handlesubmitform = async (e) => {
    e.preventDefault()
    const url = `${BASE_URL}/api/v1/users/addProjectReport`

    const data = {
      project: project.current.value,
      report: report.current.value,
    }

    const reportDetails = JSON.stringify(data)
    console.log(reportDetails)
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: reportDetails,
    })
    const data2 = await response.json()
    if (response.ok === true) {
      toast.success('report submitted successfully')
      navigate('/employeeProjectReport')
    } else {
      console.log(data2)
      setError(data2?.message)
    }
  }

  return (
    <div>
      <div>
        <ToastContainer />
        <EmployeeHeader />
        <div className="mb-36">
          <div className="p-10 mt-8 text-center">
            <h1 className="font-bold text-2xl  ">Project Report</h1>
          </div>
          <form onSubmit={handlesubmitform}>
            <div className="w-6/12 mt-[-20px] m-auto">
              <div className="bg-blue-900 rounded-xl p-7  shadow-2xl">
                <h1 className="ml-5 text-sm font-medium text-white">
                  Select Project
                </h1>
                <label htmlFor="dropdown"></label>
                <select
                  ref={project}
                  name="projects"
                  id="project"
                  className="mt-3 ml-4 mr-5 border-2 px-3 text-sm border-gray-500 rounded-md h-9"
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.projectTitle}>
                      {project.projectTitle}
                    </option>
                  ))}
                </select>
                <div className=" py-7 px-5">
                  <h1 className="text-sm font-medium mb-4 text-white">
                    Project Report
                  </h1>
                  <textarea
                    ref={report}
                    className="rounded-lg w-[100%] py-2 px-4"
                    rows="4"
                    id="projectReportText"
                  />
                </div>
                {error && (
                  <div className="text-red-500 font-bold text-md ml-5">
                    {error}
                  </div>
                )}
                <button className=" bg-blue-500 w-[130px] ml-[18px] h-10 rounded-lg  mt-3 text-white hover:bg-blue-600 hover:shadow-lg active:bg-blue-700 active:border-collapse active:font-semibold active:shadow-2xl">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default ProjectReport
