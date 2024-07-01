import React from 'react'
import FooterHeader from './FooterHeader'

const FAQ = () => {
  return (
    <div>
      <FooterHeader />
      <div className="py-8 px-4">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">FAQ</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-black mb-2">General</h3>
          <p className="text-lg text-blueGray-700">
            Find answers to common questions about our company and policies.
          </p>
          <ul className="list-disc text-lg text-blueGray-700 ml-8 mt-4">
            <li>What are the working hours?</li>
            <li>How can I request time off?</li>
            <li>Where can I find the employee handbook?</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-black mb-2">
            Benefits and Compensation
          </h3>
          <p className="text-lg text-blueGray-700">
            Explore questions related to benefits and compensation packages.
          </p>
          <ul className="list-disc text-lg text-blueGray-700 ml-8 mt-4">
            <li>What health benefits are provided?</li>
            <li>How does the retirement plan work?</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FAQ
