import React from 'react'
import EmployeeHeader from './EmployeeHeader'
import Footer from '../footer/Footer'

const EmployeeHome = () => {
  return (
    <div>
      <div>
        <EmployeeHeader />
        <div className="flex items-center justify-center mt-5">
          <img
            src="https://media.licdn.com/dms/image/C4D12AQH3moW8i3ewrw/article-cover_image-shrink_600_2000/0/1628589993746?e=2147483647&v=beta&t=x0r-d-0VMlcRA_l3hQGm6RBCel5ZrQrV1KkIE6N167g"
            alt="employee home page logo"
            className="w-[70%]"
          />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default EmployeeHome
