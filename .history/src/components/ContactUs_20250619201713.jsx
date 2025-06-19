import React from "react";
import { Button, Input } from './index';

const ContactUs = () => {
  return (
    <div className="p-2 dark:bg-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        Contact Us
      </h1>
      <div className="grid sm:grid-cols-2 items-start gap-12 p-8 mx-auto mb-5 max-w-4xl bg-white shadow-[0_2px_5px_5px_rgba(255,165,0,0.3)] rounded-md font-[sans-serif] dark:bg-gray-800">

        {/* LEFT SECTION */}
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
                  📧
                </div>
                <a href="mailto:info@example.com" className="text-[#007bff] text-sm ml-4">
                  <small className="block">Mail</small>
                  <strong>info@example.com</strong>
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIALS */}
          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold dark:text-white">Socials</h2>
            <ul className="flex mt-4 space-x-4">
              {/* Facebook */}
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#007bff" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.013 3.676 9.163 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.013 22 12z" />
                  </svg>
                </a>
              </li>

              {/* LinkedIn */}
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#007bff" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75c.967 0 1.75.783 1.75 1.75s-.783 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.061-1.867-3.061-1.869 0-2.156 1.46-2.156 2.967v5.698h-3v-10h2.879v1.364h.041c.401-.76 1.379-1.561 2.838-1.561 3.036 0 3.596 1.997 3.596 4.594v5.603z" />
                  </svg>
                </a>
              </li>

              {/* Instagram */}
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#007bff" viewBox="0 0 24 24">
                    <path d="M12 2.2c3.183 0 3.584.012 4.85.07 1.206.057 2.005.25 2.475.42a4.923 4.923 0 011.743 1.093 4.93 4.93 0 011.093 1.743c.17.47.363 1.269.42 2.475.058 1.266.07 1.667.07 4.85s-.012 3.584-.07 4.85c-.057 1.206-.25 2.005-.42 2.475a4.93 4.93 0 01-1.093 1.743 4.93 4.93 0 01-1.743 1.093c-.47.17-1.269.363-2.475.42-1.266.058-1.667.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.057-2.005-.25-2.475-.42a4.923 4.923 0 01-1.743-1.093 4.923 4.923 0 01-1.093-1.743c-.17-.47-.363-1.269-.42-2.475C2.212 15.784 2.2 15.383 2.2 12.2s.012-3.584.07-4.85c.057-1.206.25-2.005.42-2.475a4.923 4.923 0 011.093-1.743A4.923 4.923 0 015.526 2.69c.47-.17 1.269-.363 2.475-.42C8.616 2.212 9.017 2.2 12 2.2z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SECTION - FORM */}
        <form className="ml space-y-4">
          <Input
            type='text'
            placeholder='Name'
            className="outline-none focus:border-blue-500 w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"
          />
          <Input
            type='email'
            placeholder='Email'
            className="outline-none focus:border-blue-500 w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"
          />
          <Input
            type='text'
            placeholder='Subject'
            className="outline-none focus:border-blue-500 w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"
          />
          <textarea
            placeholder='Message'
            rows="6"
            className="outline-none focus:border-blue-500 w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"
          ></textarea>
          <Button
            type='button'
            className="text-white bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-4 py-2.5 w-full !mt-6"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
