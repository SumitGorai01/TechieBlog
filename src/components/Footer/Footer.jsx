import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Instagram,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Logo from "../Logo";
import ContributorsLink from "../contributors/contributorsLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 360;
      setScrollProgress(progress);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <footer className="relative bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Brand Section */}
          <div className="space-y-2">
            <div className="">
              <Logo />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Bridging the gap between knowledge and action, TechieBlog fuels
              tech enthusiasts and developers with insights to thrive.
            </p>


            <div className="footer-section">
               <h4>Contact Us</h4>
                <p>Email: support@techieblog.com</p>
                <p>Phone: +1 (234) 567-890</p>
            </div>

            <div className="flex justify-center md:justify-start space-x-4">

            <div className="flex justify-center md:justify-start space-x-4 space-y-6">


            {/* <div className="flex justify-center md:justify-start space-x-4 space-y-6">

              <a href="https://facebook.com" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#f97316] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-105 dark:bg-gray-800 dark:border-gray-700 mt-6">
                  <Facebook className="w-5 h-5 text-gray-600 group-hover:text-[#f97316] dark:text-gray-400 transition-colors duration-300" />
                </div>
              </a>
              <a href="https://twitter.com" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#f97316] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 group-hover:text-[#f97316] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
              </a>
              <a href="https://linkedin.com" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#f97316] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
                  <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-[#f97316] dark:text-gray-400 transition-colors duration-300" />
                </div>
              </a>
              <a href="https://instagram.com" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#f97316] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
                  <Instagram className="w-5 h-5 text-gray-600 group-hover:text-[#f97316] dark:text-gray-400 transition-colors duration-300" />
                </div>
              </a>
            </div> */}
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6 ml-12">
            <h3 className="text-lg ml-5 dark:text-gray-200 font-bold">
              Company
            </h3>
            <ul className="space-y-4">
              {[

                { name: 'About Us', path: '/about-us' },
                { name: 'Feedback', path: '/feedback' },
                { name: 'Events', path: '/events' },
                { name: 'Privacy Policy', path:'/privacypolicy'
                { name: "About Us", path: "/about-us" },
                { name: "Feedback", path: "/feedback" },
                { name: "Events", path: "/events" }
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="group dark:hover:text-gray-200 dark:text-gray-400 flex items-center text-gray-600 hover:text-gray-900 relative w-full text-left"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125" />
                    <span className="relative">
                      {item.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </span>
                  </button>
                </li>

              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-6 ml-6">
            <h3 className="text-lg ml-5 dark:text-gray-200 font-bold">
              Support
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Account", path: "/login" },
                { name: "FAQ", path: "/faq" },
                { name: "Contact Us", path: "/contact-us" },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 relative w-full text-left"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125" />
                    <span className="relative">
                      {item.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg  dark:text-gray-200 font-bold">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="group flex items-center justify-center md:justify-start space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300 cursor-pointer">
                <MapPin className="w-5 h-5 text-blue-500 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span className="relative">123 Tech Street, Digital City</span>
              </li>
              <li className="group flex items-center justify-center md:justify-start space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300 cursor-pointer">
                <Phone className="w-5 h-5 text-blue-500 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span className="relative">+1 (555) 123-4567</span>
              </li>
              <li className="group flex items-center justify-center md:justify-start space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300">
                <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />

                <span className="relative">
                  <a href="mailto:support@techieblog.com" >
                    support@techieblog.com
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                  </a>
                  <div className="footer-section">
                  <p>&copy; 2023 TechieBlog. All rights reserved.</p>
                  </div>

                </span>

                <a href="mailto:support@techieblog.com" className="relative">
                  support@techieblog.com
                </a>

              </li>
            </ul>
          </div>
        </div>

        {/* ✅ New Bottom Row Section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 dark:text-gray-400 ">
          {/* Social Icons */}
          <div className="flex space-x-6">
            <a href="https://facebook.com">
              <Facebook className="w-5 h-5 hover:text-orange-500" />
            </a>
            <a href="https://twitter.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 hover:text-orange-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com">
              <Linkedin className="w-5 h-5 hover:text-orange-500" />
            </a>
            <a href="https://instagram.com">
              <Instagram className="w-5 h-5 hover:text-orange-500" />
            </a>
          </div>

          {/* Copyright */}
          
          <p className="text-lg text-center md:text-left mt-2">           
            © {new Date().getFullYear()} TechieBlog. All Rights Reserved.
          </p>

          {/* Contributors */}
          <div className="flex items-center space-x-2 mr-5">
            <span className="text-sm font-semibold">Contributors:</span>
            <ContributorsLink classes="w-8 h-8 hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div
        id="scrollButton"
        className={`fixed bottom-6 right-6 w-10 h-10 flex items-center justify-center z-50 cursor-pointer transition-all duration-500 hover:scale-110 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(orange 0deg, orange ${scrollProgress}deg, transparent ${scrollProgress}deg, transparent 360deg)`,
          }}
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-orange-500 text-xl hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
