import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div>
      <div className="flex justify-between border-3 border bg-blue-900 shadow-3xl">
        <div className="">
          <img
            src="https://hrblusky.com/wp-content/uploads/2023/09/unnamed.webp"
            className="w-[77px] "
            alt="This is hr logo"
          />
        </div>
        <ul className="flex justify-between px-10 py-4 text-center mt-1 text-white">
          <Link to="/">
            {' '}
            <li className="px-3 text-xl font-sans font-semibold active:font-semibold active:text-violet-200 link-underline link-underline-black">
              Home
            </li>
          </Link>

          <Link to="/Adminlogin/">
            <li className="px-3 text-xl font-sans font-semibold active:font-semibold active:text-violet-200 link-underline link-underline-black">
              Login
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header
