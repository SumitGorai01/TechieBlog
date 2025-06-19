import React from "react";
import { Button, Input } from './index';

const ContactUs = () => {
  return (
    <div className="p-2 dark:bg-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        Contact Us
      </h1>

      <div className="grid sm:grid-cols-2 items-start gap-12 p-8 mx-auto mb-5 max-w-4xl bg-white shadow-[0_2px_5px_5px_rgba(255,165,0,0.3)] rounded-md font-[sans-serif] dark:bg-gray-800">
        
        {/* Left Section */}
        <div>
          <h1 className="text-orange-600 text-3xl font-bold">Let's Talk</h1>
          <p className="text-sm text-gray-500 mt-4 dark:text-white">
            Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project and provide help.
          </p>

          {/* Email */}
          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold dark:text-white">Email</h2>
            <ul className="mt-4">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#007bff" viewBox="0 0 24 24">
                    <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 
                    0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 8.414l8 
                    5.086 8-5.086V6l-8 5.086L4 6v2.414z"/>
                  </svg>
                </div>
                <a href="mailto:info@example.com" className="text-[#007bff] text-sm ml-4">
                  <small className="block">Mail</small>
                  <strong>info@example.com</strong>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold dark:text-white">Socials</h2>
            <ul className="flex mt-4 space-x-4">
              {/* Facebook */}
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#d3d3d3] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#007bff" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.522-4.477-10-10-10S2 
                    6.478 2 12c0 5.005 3.676 9.152 8.438 
                    9.877v-6.987H7.898v-2.89h2.54V9.845c0-2.506 
                    1.492-3.89 3.777-3.89 1.094 0 
                    2.238.195 2.238.195v2.46h-1.26c-1.242 
                    0-1.63.771-1.63 1.562v1.875h2.773l-.443 
                    2.89h-2.33v6.987C18.324 21.152 22 17.005 22 12z"/>
                  </svg>
                </a>
              </li>

              {/* LinkedIn */}
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#d3d3d3] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#007bff" viewBox="0 0 24 24">
                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 
                    6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 
                    1.12 2.48 2.5zM.5 24h4V7H.5v17zM7.5 
                    7h3.636v2.563H11.2c.505-.958 
                    1.737-1.964 3.573-1.964 3.817 
                    0 4.524 2.512 4.524 5.774V24h-4V14.5c0-2.24-.04-5.125-3.125-5.125-3.132 
                    0-3.612 2.45-3.612 4.984V24h-4V7z"/>
                  </svg>
                </a>
              </li>

              {/* Instagram */}
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#d3d3d3] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#007bff" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 
                    4.85.07 1.17.056 1.97.24 
                    2.43.403a4.92 4.92 0 011.675 
                    1.09 4.92 4.92 0 011.09 
                    1.675c.163.46.347 1.26.403 
                    2.43.058 1.266.07 1.645.07 
                    4.849s-.012 3.584-.07 
                    4.85c-.056 1.17-.24 1.97-.403 
                    2.43a4.92 4.92 0 01-1.09 
                    1.675 4.92 4.92 0 01-1.675 
                    1.09c-.46.163-1.26.347-2.43.403-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.403a4.902 4.902 0 
                    01-2.765-2.765c-.163-.46-.347-1.26-.403-2.43C2.175 
                    15.647 2.163 15.268 2.163 
                    12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.43a4.902 
                    4.902 0 012.765-2.765c.46-.163 
                    1.26-.347 2.43-.403C8.416 
                    2.175 8.796 2.163 12 2.163zm0 
                    1.837c-3.157 0-3.508.012-4.75.07-1.014.048-1.562.217-1.926.363a3.093 
                    3.093 0 00-1.16.755 3.093 
                    3.093 0 00-.755 1.16c-.146.364-.315.912-.363 
                    1.926-.058 1.242-.07 1.593-.07 
                    4.75s.012 3.508.07 4.75c.048 
                    1.014.217 1.562.363 1.926.194.486.469.875.755 
                    1.16.285.285.674.561 1.16.755.364.146.912.315 
                    1.926.363 1.242.058 1.593.07 4.75.07s3.508-.012 
                    4.75-.07c1.014-.048 1.562-.217 
                    1.926-.363a3.093 3.093 0 
                    001.16-.755 3.093 3.093 0 
                    00.755-1.16c.146-.364.315-.912.363-1.926.058-1.242.07-1.593.07-4.75s-.012-3.508-.07-4.75c-.048-1.014-.217-1.562-.363-1.926a3.093 
                    3.093 0 00-.755-1.16 3.093 
                    3.093 0 00-1.16-.755c-.364-.146-.912-.315-1.926-.363-1.242-.058-1.593-.07-4.75-.07z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Form */}
        <form className="ml space-y-4">
          <Input
            type="text"
            placeholder="Name"
            className="outline-none focus:border-blue-500 w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"
          />
          <Input
            type="email"
            placeholder="Email"
            className="outline-none focus:border-blue-500 w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"
          />
          <Input
            type="text"
            placeholder="Subject"
            className="outline-none focus:border-blue-500 w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"
          />
          <textarea
            placeholder="Message"
            rows="6"
            className="outline-none focus:border-blue-500 w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"
          ></textarea>
          <Button
            type="button"
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
