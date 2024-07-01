import React, { useEffect, useRef, useState } from 'react'
import AdminHeader from './AdminHeader'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../helper'
import { toast, ToastContainer } from 'react-toastify' // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../footer/Footer'

const AdminAddSalary = () => {
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState(null) // Add state for error
  const navigate = useNavigate()
  const formRef = useRef(null) // Add a reference to the form element

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/admins/getEmployees`, {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies)
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setEmployees(data)
      } catch (error) {
        if (error.message === 'Network response was not ok') navigate('/')
        setError('Error fetching employee data') // Set error message
      }
    }

    fetchEmployeeDetails()
  }, [navigate])

  const user = useRef()
  const month = useRef()
  const salaryAmount = useRef()

  const handlesubmitform = async (e) => {
    e.preventDefault()
    const url = `${BASE_URL}/api/v1/admins/addEmployeeSalary`

    const data = {
      user: user.current.value,
      month: month.current.value,
      salaryAmount: salaryAmount.current.value,
    }

    const salaryDetails = JSON.stringify(data)
    //console.log(salaryDetails);
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: salaryDetails,
    })
    const data2 = await response.json()
    if (response.ok === true) {
      toast.success('Salary added successfully')
      formRef.current.reset() // Reset the form upon successful submission
    } else {
      if (error === 'Network response was not ok') navigate('/')
      toast.error(data2.message)
    }
  }

  return (
    <div>
      <ToastContainer />
      <AdminHeader />
      <div className="flex justify-center items-center h-screen">
        <div className="flex bg-blue-900 shadow-2xl h-[400px] w-[700px] rounded-2xl">
          <div>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/salary-receipt-9522699-7725497.png?f=webp"
              alt="Salary Receipt"
              className="h-[400px] w-[400px]"
            />
          </div>
          <form
            onSubmit={handlesubmitform}
            ref={formRef} // Attach the form reference
            className="flex flex-col mt-10"
          >
            <h1 className="text-2xl text-white font-bold ml-6">Add Salary</h1>
            <label className="mt-3 ml-5 text-white">Employee Name</label>
            <select
              ref={user}
              name="employee"
              id="employee"
              className="mt-1 ml-5 mr-5 border-2 px-3 text-sm border-gray-500 rounded-lg h-9"
            >
              {employees.map((employee) => (
                <option key={employee.id} value={employee.username}>
                  {employee.username}
                </option>
              ))}
            </select>
            <label className="mt-3 ml-5 text-white">Month</label>
            <select
              ref={month}
              name="month"
              id="month"
              className="mt-1 ml-5 mr-5 border-2 px-3 text-sm border-gray-500 rounded-lg h-9"
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <label className="mt-2 ml-5 px-1 text-white">Amount</label>
            <input
              ref={salaryAmount}
              type="text"
              placeholder="Enter Amount"
              className="mt-1 ml-5 mr-5 border-2 border-gray-500 text-sm rounded-lg h-9 px-3"
            />
            {error && (
              <div className="mx-10 text-red-500 font-bold mt-3">{error}</div>
            )}
            <button className="mt-3 ml-5 mb-3 text-center text-white h-[34px] bg-blue-500 mr-5 hover:bg-blue-600 hover:shadow-lg active:bg-blue-700 rounded-lg active:font-semibold active:shadow-2xl">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminAddSalary
