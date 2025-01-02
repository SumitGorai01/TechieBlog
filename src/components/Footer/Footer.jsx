import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 text-black py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo  />
            </div>
            {/* <div className='flex items-center'>
                LOGO
            </div> */}
            
          </div>
          
          <div>
            <h3 className="text-xs text-black font-bold uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link className="text-base font-medium hover:text-gray-400" to="/">Features</Link>
              </li>
              <li>
                <Link className="text-base font-medium hover:text-gray-400" to="/">Pricing</Link>
              </li>
              <li>
                <Link className="text-base font-medium hover:text-gray-400" to="/">Affiliate Program</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs text-black font-bold uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link className="text-base font-medium hover:text-gray-400" to="/">Account</Link>
              </li>
              <li>
                <Link className="text-base font-medium hover:text-gray-400" to="/">Help</Link>
              </li>
              <li>
                <Link className="text-base font-medium hover:text-gray-400" to="/">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs text-black font-bold uppercase mb-4">Legals</h3>
            <ul className="space-y-3">
              <li>
                <Link className="text-base font-medium hover:text-gray-400" to="/">Terms & Conditions</Link>
              </li>
              <li>
                <Link className="text-base font-medium hover:text-gray-400" to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link className="text-base font-medium hover:text-gray-400" to="/">Licensing</Link>
              </li>
            </ul>
          </div>

          <div className="flex justify-center md:justify-start items-center space-x-4 mt-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <p className="text-sm font-semibold text-center mt-4">&copy; Copyright 2024. All Rights Reserved by TechieBlog.</p>
    </footer>
  )
}

export default Footer
