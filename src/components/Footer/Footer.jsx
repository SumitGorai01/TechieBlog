import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '../Logo';
import ContributorsLink from '../contributors/contributorsLink';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 360;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black">
              
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Brand Section */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-600 dark:text-gray-400">
              Bridging the gap between knowledge and action, TechieBlog fuels tech enthusiasts and developers with insights to thrive.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#1876f2] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
                  <Facebook className="w-5 h-5 text-gray-600 group-hover:text-[#1876f2] dark:text-gray-400" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#0F1419] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
                  {/* Updated Twitter (X) Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-600 group-hover:text-[#0F1419]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border  border-gray-300 group-hover:border-[#0077B5] group-hover:shadow-lg 
                transition-all duration-300 transform group-hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800">
                  <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-[#0077B5] dark:text-gray-400" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300 group-hover:border-[#E1306C] group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
                  <Instagram className="w-5 h-5 text-gray-600 group-hover:text-[#E1306C] dark:text-gray-400" />
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg dark:text-gray-200 font-bold">Company</h3>
            <ul className="space-y-4">
              {['About Us', 'Feedback', 'Events'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="group dark:hover:text-gray-200 dark:text-gray-400 flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-6">
            <h3 className="text-lg dark:text-gray-200 font-bold">Support</h3>
            <ul className="space-y-4">
              {['Account', 'Faq', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg dark:text-gray-200 font-bold">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-start space-x-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span>123 Tech Street, Digital City</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span><a href="mailto:support@techieblog.com" className="hover:underline">support@techieblog.com</a></span>
              </li>
            </ul>
            <div className="mt-3">
              <h3 className="text-lg font-bold dark:text-gray-200">Contributors</h3>
              <ContributorsLink classes="w-10 h-10" />
            </div>
          </div>
        </div>

        {/* Divider with Animation */}
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-400  dark:border-gray-400"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 px-4 dark:from-gray-800">
              <Logo className="h-8 w-auto" />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-5">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © Copyright {new Date().getFullYear()}. All Rights Reserved by TechieBlog.
          </p>
        </div>
      </div>

      {/* Enhanced Scroll to Top Button */}
      <div
        id="scrollButton"
        className={`fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center z-50 cursor-pointer transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(orange 0deg, orange ${scrollProgress}deg, transparent ${scrollProgress}deg, transparent 360deg)`,
          }}
        >
          <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg">
            <FontAwesomeIcon icon={faArrowUp} className="text-orange-500 text-2xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
