import React from 'react'
import FooterHeader from './FooterHeader'

const AboutUs = () => {
  return (
    <div>
      <FooterHeader />
      <div className="px-4 py-8">
        <div className="mx-[7%]">
          <h1 className="text-3xl font-semibold text-blue-900">About Us</h1>
          <p className="mt-4 text-lg text-blueGray-700">
            Welcome to our HR Management Portal. We are dedicated to providing
            the best human resources services to our employees. Our mission is
            to foster a supportive and engaging work environment where every
            employee feels valued and empowered.
          </p>
          <h2 className="text-2xl font-semibold text-blue-900 mt-6">
            Our Mission
          </h2>
          <div className="flex flex-col lg:flex-row items-start">
            <div className="lg:w-1/2 mt-3 lg:pr-2">
              <p className="text-lg text-blueGray-700">
                Imagine a workplace where employees come to work inspired, feel
                safe, share a common purpose with peers and leaders, do their
                best work, and go home fulfilled. We are on a mission to make
                this happen across the world.
              </p>
              <p className="mt-2 text-lg text-blueGray-700">
                Our mission is to make a positive and lasting impact on society
                through our programs. We strive to empower individuals, promote
                inclusivity, and foster personal and professional growth.
                Through innovative initiatives, educational opportunities, and
                community engagement, we aim to inspire, educate, and equip
                people with the skills and resources they need to thrive. With a
                commitment to excellence and a passion for making a difference,
                we are dedicated to creating a brighter future for all.
              </p>
              <p className="mt-6 text-lg text-blueGray-700">
                Our team is committed to ensuring that all HR processes are
                transparent, efficient, and aligned with the company's goals. We
                strive to support our employees through every stage of their
                career, from onboarding to professional development.
              </p>
            </div>
            <div className="lg:w-1/2 mt-4 lg:mt-0">
              <img
                src="https://hr.keka.com/ats/documents/24040a7e-a7c5-47a5-9cd5-019962c66385/careerportal/0184d8d81dfb4d6b838839109cb2ac1f.jpg"
                alt="HR Mission"
                className="w-full lg:w-3/4 h-auto mx-auto"
                style={{ maxHeight: '300px' }} // Adjusted max height
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
