import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-blue-900 pt-8 pb-6 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-white">
              Stay Connected with HR!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-white">
              Follow us on social media for the latest HR updates and resources.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-twitter"></i>
              </button>
              <button
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a
                  href="https://www.linkedin.com/company/training-placement-office-rgukt-basar/"
                  target="blank"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </button>
              <button
                className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a
                  href="https://www.instagram.com/codeclub_rguktb/"
                  target="blank"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </button>
              <button
                className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-300 text-sm font-semibold mb-2">
                  Quick Links
                </span>
                <ul className="list-unstyled">
                  <li className="text-white hover:underline font-semibold block pb-2 text-sm">
                    <Link to="/about-hr/">About us</Link>
                  </li>
                  <li>
                    <a
                      className="text-white hover:underline font-semibold block pb-2 text-sm"
                      href="/careers"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:underline font-semibold block pb-2 text-sm"
                      href="/contact"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-300 text-sm font-semibold mb-2">
                  HR Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-white hover:underline font-semibold block pb-2 text-sm"
                      href="/policies"
                    >
                      Policies
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:underline font-semibold block pb-2 text-sm"
                      href="/benefits"
                    >
                      Benefits
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:underline font-semibold block pb-2 text-sm"
                      href="/training"
                    >
                      Training
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:underline font-semibold block pb-2 text-sm"
                      href="/faq"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © {new Date().getFullYear()}{" "}
              <a
                href="https://www.yourcompany.com"
                className="text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Your Company
              </a>
              . All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
