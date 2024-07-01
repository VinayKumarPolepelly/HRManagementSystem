import React from 'react'
import FooterHeader from './FooterHeader'

const ContactUs = () => {
  return (
    <div>
      <FooterHeader />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="px-4 py-8 bg-gray-200">
          <h1 className="text-3xl font-semibold text-center text-blue-900 mb-2">
            Contact Us
          </h1>
          <p className="text-lg text-center text-blueGray-700">
            Get in touch with us for any inquiries or support.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="flex">
          {/* Left Side Content */}
          <div className="w-full lg:w-3/4 px-4 py-8">
            {/* Got something to say? Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-900 mb-2">
                Got something to say?
              </h2>
              <h3 className="text-xl font-semibold text-black mb-4">
                Interested in HR?
              </h3>
              <p className="text-lg text-blueGray-700 mb-4">
                Just pick up the phone to chat with a member of our sales team.
              </p>
              <div className="flex  flex-wrap flex-col mb-4">
                <div className="w-full lg:w-1/3 mb-4 lg:mb-5">
                  <h4 className="text-lg font-semibold text-red-600">SALES</h4>
                  <p className="mt-2 text-lg text-black">
                    <a
                      href="tel:+917075748373"
                      className="hover:underline hover:text-blue-600"
                    >
                      +91 7075748373
                    </a>
                    &nbsp;|&nbsp;
                    <a
                      href="mailto:nikhildyaga123@gmail.com"
                      className="hover:underline hover:text-blue-600"
                    >
                      nikhildyaga123@gmail.com
                    </a>
                  </p>
                </div>
                <div className="w-full lg:w-1/3 mb-4 lg:mb-5">
                  <p className="mt-2 text-lg text-black">
                    <a
                      href="tel:+919133989634"
                      className="hover:underline hover:text-blue-600"
                    >
                      +91 9133989634
                    </a>
                    &nbsp;|&nbsp;
                    <a
                      href="mailto:sathwikavontela123@gmail.com"
                      className="hover:underline hover:text-blue-600"
                    >
                      sathwikavontela123@gmail.com
                    </a>
                  </p>
                </div>
                <div className="w-full lg:w-1/3 mb-4 lg:mb-5">
                  <p className="mt-2 text-lg text-black">
                    <a
                      href="tel:+919581469985"
                      className="hover:underline hover:text-blue-600"
                    >
                      +91 9581469985
                    </a>
                    &nbsp;|&nbsp;
                    <a
                      href="mailto:vinaykumarpolepally30@gmail.com"
                      className="hover:underline hover:text-blue-600"
                    >
                      vinaykumarpolepally30@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Support Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-red-600 mb-2">
                CUSTOMER SUPPORT
              </h3>
              <h4 className="text-xl font-semibold text-black mb-4">
                Need any help?
              </h4>
              <p className="text-lg text-blueGray-700 mb-4">
                Don’t worry, we’re here for you.
              </p>
              <p className="text-lg text-black mb-4">
                <a
                  href="mailto:support@hr.com"
                  className="hover:underline hover:text-blue-600"
                >
                  support@hr.com
                </a>
              </p>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="w-full lg:w-2/4 px-4 py-8 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              Let's Talk
            </h2>
            <form className="max-w-lg">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold text-blueGray-900 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-lg font-semibold text-blueGray-900 mb-2"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-blueGray-900 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="block text-lg font-semibold text-blueGray-900 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
