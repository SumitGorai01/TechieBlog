import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Instagram,
  ArrowUp,
  MapPin,
  UserRound,
  Info,
  MessageCircle,
  CalendarDays,
  LifeBuoy,
  Headset,
  User,
  UserCog,
  HelpCircle,
  Mail,
  Phone,
  Sparkles,
  ChevronUp,
  Users as UsersIcon,
} from "lucide-react";
import Logo from "../Logo";
import ContributorsLink from "../contributors/contributorsLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FaDiscord } from "react-icons/fa6"; // Or from 'react-icons/fa'

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

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = import.meta.env.VITE_BOTPRESS_SCRIPT_1;
    script1.defer = true;

const script2 = document.createElement('script');
script2.src = import.meta.env.VITE_BOTPRESS_SCRIPT_2;
script2.defer = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

const handleNavigation = (path) => {
  window.scrollTo(0, 0);
  navigate(path);
};
  
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-4">
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center space-x-2">
              <Logo />
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Bridging the gap between knowledge and action, TechieBlog fuels
              tech enthusiasts and developers with insights to thrive in the
              digital age.
            </p>
            <div className="flex space-x-3">
              {[
                {
                  icon: Facebook,
                  href: "https://facebook.com",
                  color: "hover:text-blue-500",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  color: "hover:text-blue-600",
                },
                {
                  icon: Instagram,
                  href: "https://instagram.com",
                  color: "hover:text-pink-500",
                },
                {
                  icon: FaDiscord,
                  href: "https://discord.gg/CQgK8742",
                  color: "hover:text-purple-500",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-orange-500/20 group-hover:border-orange-300">
                    <social.icon
                      className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-colors duration-300 ${social.color}`}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                Company
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about-us", icon: Info },
                { name: "Feedback", path: "/feedback", icon: MessageCircle },
                { name: "Events", path: "/events", icon: CalendarDays },
                { name: "Our Team", path: "/team", icon: UsersIcon },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="group flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-300 w-full text-left"
                  >
                    <div className="w-8 h-8 bg-orange-100/50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-orange-200/70 dark:group-hover:bg-orange-800/30 group-hover:scale-110">
                      <item.icon className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                    </div>
                    <span className="relative font-medium">
                      {item.name}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                Support
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                { name: "Account", path: "/login", icon: UserRound },
                { name: "FAQ", path: "/faq", icon: HelpCircle },
                { name: "Contact Us", path: "/contact-us", icon: Phone },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="group flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-300 w-full text-left"
                  >
                    <div className="w-8 h-8 bg-orange-100/50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-orange-200/70 dark:group-hover:bg-orange-800/30 group-hover:scale-110">
                      <item.icon className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                    </div>
                    <span className="relative font-medium">
                      {item.name}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                Get in Touch
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="group flex items-start space-x-3 text-slate-600 dark:text-slate-400 transition-colors duration-300">
                <div className="w-8 h-8 bg-orange-100/50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mt-0.5  transition-all duration-300 group-hover:bg-orange-200/70 dark:group-hover:bg-orange-800/30">
                  <MapPin className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Address
                  </span>
                  <p className="text-sm">Tech Park, Digital City, India</p>
                </div>
              </li>
              <li className="group flex items-start space-x-3 text-slate-600 dark:text-slate-400 transition-colors duration-300">
                <div className="w-8 h-8 bg-orange-100/50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mt-0.5  transition-all duration-300 group-hover:bg-orange-200/70 dark:group-hover:bg-orange-800/30">
                  <Phone className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Phone : { " "}
                  </span><a
                    href="tel:+15551234567"
                    className="text-sm hover:text-orange-500 transition-colors duration-200"
                  >
                    +1 (555) 123-4567
                  </a>
                  {/* <p className="text-sm">+1 (555) 123-4567</p> */}
                </div>
              </li>
              <li className="group flex items-start space-x-3 text-slate-600 dark:text-slate-400 transition-colors duration-300">
                <div className="w-8 h-8 bg-orange-100/50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center  transition-all duration-300 group-hover:bg-orange-200/70 dark:group-hover:bg-orange-800/30">
                  <Mail className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Email:{" "}
                  </span>
                  <a
                    href="mailto:sumitgr7479@gmail.com"
                    className="text-sm mt-1 hover:text-orange-500 transition-colors duration-200"
                  >
                    support@techieblog.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-4">
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                © {new Date().getFullYear()} TechieBlog. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 right-6 z-50">
<script src="https://cdn.botpress.cloud/webchat/v3.2/inject.js" defer></script>
<script src="https://files.bpcontent.cloud/2025/08/09/18/20250809180041-F5Z71XWG.js" defer></script>
      </div>

      <div
        id="scrollButton"
        className={`fixed bottom-24 right-9 w-10 h-10 flex items-center justify-center z-50 cursor-pointer transition-all duration-500 hover:scale-110 ${
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
