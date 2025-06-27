

import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';

import Logo from '../Logo';
import ContributorsLink from '../contributors/contributorsLink';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

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

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <footer className="relative bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">

          <div className="space-y-4">
            <Logo />
            <p>
              Bridging the gap between knowledge and action, TechieBlog fuels tech enthusiasts and developers with insights to thrive.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              {[{
                icon: <Facebook className="w-5 h-5" />, color: '#1876f2'
              }, {
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, color: '#0F1419'
              }, {
                icon: <Linkedin className="w-5 h-5" />, color: '#0077B5'
              }, {
                icon: <Instagram className="w-5 h-5" />, color: '#E1306C'
              }].map(({ icon, color }, i) => (
                <a key={i} href="#" className="group transition transform hover:-translate-y-1">
                  <div className={`p-2 bg-white dark:bg-gray-800 border rounded-lg shadow hover:border-[${color}] hover:shadow-md`}>
                    <div className={`text-gray-600 dark:text-gray-400 group-hover:text-[${color}]`}>{icon}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>



          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg dark:text-gray-200 font-bold">Company</h3>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about-us' },
                { name: 'Feedback', path: '/feedback' },
                { name: 'Events', path: '/events' }
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
          <div className="space-y-6">
            <h3 className="text-lg dark:text-gray-200 font-bold">Support</h3>
            <ul className="space-y-4">
              {[
                { name: 'Account', path: '/login' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Contact Us', path: '/contact-us' }
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

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="text-blue-500" />
                <span>123 Tech Street, Digital City</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </li>

              <li className="group flex items-center justify-center md:justify-start space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300">
                <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span className="relative">
                  <a href="mailto:support@techieblog.com" >
                    support@techieblog.com
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                  </a>
                </span>

              </li>
            </ul>
            <div>
              <h4 className="font-bold">Contributors</h4>
              <ContributorsLink classes="w-10 h-10 hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>



        {/* Divider with Animation */}
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-400 dark:border-gray-400"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 px-4 dark:from-gray-800">
              <Logo className="h-8 w-auto hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-5">
          <p className="text-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300">
            © Copyright {new Date().getFullYear()}. All Rights Reserved by 
            <Link
              to="/"
              className="relative ml-1 font-semibold group cursor-pointer"
            >
              TechieBlog
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300 ease-out"></span>
            </Link>.

          </p>
        </div>

        {/* Scroll to Top */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-6 right-6 w-14 h-14 z-50 cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity`}
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
      </div>
    </footer>
  );
};

export default Footer;
