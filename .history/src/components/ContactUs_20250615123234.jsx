import React from "react";
import { Button, Input } from './index'

const ContactUs = () => {
  return (
    <div class="p-2 dark:bg-gray-800 ">
       <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        Contact Us
      </h1>
      <div class="grid sm:grid-cols-2 items-start gap-12 p-8 mx-auto mb-5 max-w-4xl bg-white shadow-[0_2px_5px_5px_rgba(255,165,0,0.3)] rounded-md font-[sans-serif] dark:bg-gray-800">
     
        <div>
          <h1 class="text-orange-600 text-3xl font-bold">Let's Talk</h1>
          <p class="text-sm text-gray-500 mt-4 dark:text-white">Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project  and provide help.</p>

          
        <form class="ml space-y-4 ">
          <Input type='text' placeholder='Name'
            className="outline-none focus:border-blue-500 hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"  />
          <Input type='email' placeholder='Email'
            className="outline-none focus:border-blue-500 hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white" />
          <Input type='text' placeholder='Subject'
            className="outline-none focus:border-blue-500 hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white " />
          <textarea placeholder='Message' rows="6"
            className="outline-none focus:border-blue-500 hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600 dark:bg-gray-800 dark:text-white"></textarea>
          <Button type='button'
            class="text-white bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-4 py-2.5 w-full !mt-6">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
