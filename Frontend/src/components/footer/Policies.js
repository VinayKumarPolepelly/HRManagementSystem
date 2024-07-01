import React from 'react'
import FooterHeader from './FooterHeader'

const Policies = () => {
  return (
    <div>
      <FooterHeader />
      <div className="py-8 px-4">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Policies</h2>
        <p className="text-lg text-blueGray-700">
          Our company maintains clear and fair policies to ensure a positive
          work environment. These policies cover areas such as:
        </p>
        <ul className="list-disc text-lg text-blueGray-700 ml-8 mt-4">
          <li>Employee Code of Conduct</li>
          <li>Equal Opportunity Policy</li>
          <li>Attendance and Leave Policy</li>
          <li>Workplace Safety Guidelines</li>
        </ul>
      </div>
    </div>
  )
}

export default Policies
