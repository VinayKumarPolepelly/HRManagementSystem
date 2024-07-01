import React from 'react'
import FooterHeader from './FooterHeader'

const Benefits = () => {
  return (
    <div>
      <FooterHeader />
      <div className="py-8 px-4">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Benefits</h2>
        <p className="text-lg text-blueGray-700">
          We offer competitive benefits to support our employees' well-being and
          growth, including:
        </p>
        <ul className="list-disc text-lg text-blueGray-700 ml-8 mt-4">
          <li>Health Insurance</li>
          <li>Retirement Savings Plans</li>
          <li>Flexible Work Arrangements</li>
          <li>Professional Development Opportunities</li>
        </ul>
      </div>
    </div>
  )
}

export default Benefits
