import React from "react";
import { Button, Input } from './index';

const ContactUs = () => {
  return (
    <div className="p-2 dark:bg-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        Contact Us
      </h1>
      <div className="grid sm:grid-cols-2 items-start gap-12 p-8 mx-auto mb-5 max-w-4xl bg-white shadow-[0_2px_5px_5px_rgba(255,165,0,0.3)] rounded-md font-[sans-serif] dark:bg-gray-800">

        <div>
          <h1 className="text-orange-600 text-3xl font-bold">Let's Talk</h1>
          <p className="text-sm text-gray-500 mt-4 dark:text-white">
            Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project and provide help.
          </p>

          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold dark:text-white">Email</h2>
            <ul className="mt-4">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  {/* Email Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 479.058 479.058">
                    <path d="... (email icon path) ..." />
                  </svg>
                </div>
                <a href="mailto:info@example.com" className="text-[#007bff] text-sm ml-4 cursor-pointer">
                  <small className="block">Mail</small>
                  <strong>info@example.com</strong>
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold dark:text-white">Socials</h2>
            <ul className="flex mt-4 space-x-4">
              {/* Facebook */}
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 24 24">
                    <path d="... (facebook path) ..." />
                  </svg>
                </a>
              </li>
              {/* LinkedIn */}
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 511 512">
                    <path d="... (linkedin path) ..." />
                  </svg>
                </a>
              </li>
              {/* Instagram */}
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 24 24">
                    <path d="... (instagram path) ..." />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form className="ml space-y-4">
          <Input type='text' placeholder='Name' className="outline-none focus:border-blue-500 hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white" />
          <Input type='email' placeholder='Email' className="outline-none focus:border-blue-500 hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white" />
          <Input type='text' placeholder='Subject' className="outline-none focus:border-blue-500 hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white" />
          <textarea placeholder='Message' rows="6" className="outline-none focus:border-blue-500 hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"></textarea>
          <Button type='button' className="text-white bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-4 py-2.5 w-full !mt-6">
            Send
          </Button>
        </form>

      </div>
    </div>
  );
};

export default ContactUs;
