import React from 'react'
import AdminHeader from './AdminHeader'
import Footer from '../footer/Footer'

const AdminBrowse = () => {
  return (
    <div className="bg-white">
      <AdminHeader />
      <div className="h-[100%] ">
        <h1 className="text-blue-900 text-2xl text-center pt-6 font-semibold">
          Welcome Admin!
        </h1>
        <div className="flex justify-center items-center">
          <img
            src="https://ams3.digitaloceanspaces.com/digital-practice/static/amava/img/digital/digital_practice_leave_management.png"
            alt="hr page logo "
            className="h-[500px] w-[700px] mt-5 ml-11"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminBrowse
