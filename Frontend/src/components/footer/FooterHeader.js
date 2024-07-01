import React from 'react'
import { Link } from 'react-router-dom'

const FooterHeader = () => {
  return (
    <header className="bg-blue-900 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          <Link to="/">HR Management</Link>
        </div>
        <nav className="flex space-x-4">
          <Link to="/about-hr" className="text-white hover:underline">
            About Us
          </Link>
          <Link to="/careers" className="text-white hover:underline">
            Careers
          </Link>
          <Link to="/contact" className="text-white hover:underline">
            Contact Us
          </Link>
          <Link to="/policies" className="text-white hover:underline">
            Policies
          </Link>
          <Link to="/benefits" className="text-white hover:underline">
            Benefits
          </Link>
          <Link to="/training" className="text-white hover:underline">
            Training
          </Link>
          <Link to="/faq" className="text-white hover:underline">
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default FooterHeader
