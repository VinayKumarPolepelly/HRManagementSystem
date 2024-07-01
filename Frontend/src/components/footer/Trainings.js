import React from 'react'
import FooterHeader from './FooterHeader'

const Trainings = () => {
  return (
    <div>
      <FooterHeader />
      <div className="py-8 px-4">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Trainings</h2>
        <p className="text-lg text-blueGray-700">
          Continuous learning is essential for personal and professional growth.
          We provide various training opportunities such as:
        </p>
        <ul className="list-disc text-lg text-blueGray-700 ml-8 mt-4">
          <li>Onboarding Programs</li>
          <li>Leadership Development Courses</li>
          <li>Technical Skills Workshops</li>
          <li>Diversity and Inclusion Training</li>
        </ul>
      </div>
    </div>
  )
}

export default Trainings
