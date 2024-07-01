import React, { useRef, useState } from 'react'
import AdminHeader from './AdminHeader'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../helper'
import { toast, ToastContainer } from 'react-toastify' // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../footer/Footer'

const AdminAddEmployee = () => {
  const [error, setError] = useState(null)
  const username = useRef()
  const fullname = useRef()
  const email = useRef()
  const password = useRef()
  const phoneNumber = useRef()
  const role = useRef()
  const formRef = useRef(null) // Add a reference to the form element
  const navigate = useNavigate()

  const handlesubmitform = async (e) => {
    e.preventDefault()
    const url = `${BASE_URL}/api/v1/admins/register`

    const data = {
      username: username.current.value,
      password: password.current.value,
      fullname: fullname.current.value,
      email: email.current.value,
      phoneNumber: phoneNumber.current.value,
      role: role.current.value,
    }

    const userDetails = JSON.stringify(data)
    console.log(userDetails)
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: userDetails,
    })
    const data2 = await response.json()
    if (response.ok === true) {
      toast.success('Employee added successfully')
      formRef.current.reset() // Reset the form upon successful submission
    } else {
      if (error === 'Network response was not ok') navigate('/')
      toast.error(data2.message)
    }
  }

  return (
    <div>
      <AdminHeader />
      <ToastContainer />
      <div className="h-screen">
        <div className="w-9/12 my-[80px] mx-auto flex bg-blue-900 shadow-2xl h-auto py-10 rounded-2xl ">
          <div className="w-1/2 flex items-center justify-center">
            <img
              src="https://upraise.io/wp-content/uploads/2022/12/10-Functions-of-Human-Resource-Management-banner2.webp"
              alt="this is login page logo"
              className="h-[400px] w-full object-cover"
            />
          </div>
          <form
            onSubmit={handlesubmitform}
            ref={formRef} // Attach the form reference
            className="flex flex-col mt-10 ml-4 w-1/2"
          >
            <h1 className="text-2xl text-white font-bold ml-6">Add Employee</h1>
            <div className="flex flex-col mt-3">
              <label className="mt-3 ml-5 text-white">Username</label>
              <input
                ref={username}
                type="text"
                placeholder="Enter Employee username"
                className="mt-1 ml-5 mr-5 border-2  w-[90%] px-3 text-sm border-gray-500 rounded-lg h-9"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mt-3 ml-5 text-white">Fullname</label>
              <input
                ref={fullname}
                type="text"
                placeholder="Enter Employee Fullname"
                className="mt-1 ml-5 mr-5 border-2  w-[90%] px-3 text-sm border-gray-500 rounded-lg h-9"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mt-3 ml-5 text-white">Password</label>
              <input
                ref={password}
                type="password"
                placeholder="Enter Employee Password"
                className="mt-1 ml-5 mr-5 border-2  w-[90%] px-3 text-sm border-gray-500 rounded-lg h-9"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mt-3 ml-5 text-white">Email</label>
              <input
                ref={email}
                type="text"
                placeholder="Enter Employee Email"
                className="mt-1 ml-5 mr-5 border-2  w-[90%] px-3 text-sm border-gray-500 rounded-lg h-9"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mt-3 ml-5 text-white">Phone No.</label>
              <input
                ref={phoneNumber}
                type="text"
                placeholder="Enter Employee Phone No"
                className="mt-1 ml-5 mr-5 border-2  w-[90%] px-3 text-sm border-gray-500 rounded-lg h-9"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mt-3 ml-5 text-white">Role</label>
              <input
                ref={role}
                type="text"
                placeholder="Enter Employee Role"
                className="mt-1 ml-5 mr-5 border-2 w-[90%] px-3 text-sm border-gray-500 rounded-lg h-9"
              />
            </div>
            {error && (
              <div className="text-red-600 ml-5 text-center  w-[90%] mt-3 mb-[-25px] font-bold">
                <h2>{error}</h2>
              </div>
            )}
            <button className="mt-10 ml-5 mb-10 text-center w-[90%] text-white h-[34px] bg-blue-500 hover:bg-blue-600 hover:shadow-lg active:bg-blue-700 rounded-xl active:border-collapse active:font-semibold active:shadow-2xl">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminAddEmployee
