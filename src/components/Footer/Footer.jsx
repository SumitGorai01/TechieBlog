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
  X,
  Send,
  Bot,
  Minimize2,
  Maximize2,
} from "lucide-react";
import Logo from "../Logo";
import ContributorsLink from "../contributors/contributorsLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";

const Footer = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm TechieBlog Assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const navigate = useNavigate();

  const botResponses = {
    greeting: [
      "Hello! Welcome to TechieBlog! How can I assist you today?",
      "Hi there! I'm here to help you with any questions about our platform.",
      "Hey! Great to see you here. What would you like to know?",
    ],
    about: [
      "TechieBlog is your go-to platform for tech insights, tutorials, and industry news. We bridge the gap between knowledge and action for tech enthusiasts and developers.",
      "We're a community-driven tech blog focused on helping developers and tech enthusiasts stay updated with the latest trends and technologies.",
    ],
    contact: [
      "You can reach us at support@techieblog.com or call us at +1 (555) 123-4567. We're located at 123 Tech Street, Digital City.",
      "Feel free to contact us through our Contact Us page or send us an email at support@techieblog.com",
    ],
    help: [
      "I can help you with information about our platform, contact details, navigation, and general questions. What specific help do you need?",
      "You can ask me about our services, how to navigate the site, contact information, or any general questions about TechieBlog.",
    ],
    account: [
      "To access your account, click on the Account link in our Support section. You can login or create a new account there.",
      "Account management is available through our login page. You can find it in the Support section of our footer.",
    ],
    events: [
      "Check out our Events page to see upcoming tech events, webinars, and conferences we're hosting or participating in.",
      "We regularly organize tech events and workshops. Visit our Events section to stay updated!",
    ],
    default: [
      "I'm not sure about that specific question, but you can contact our support team at support@techieblog.com for detailed assistance.",
      "That's a great question! For more specific inquiries, please reach out to our support team through the Contact Us page.",
      "I'd recommend checking our FAQ section or contacting our support team for more detailed information about that topic.",
    ],
  };


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

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return getRandomResponse(botResponses.greeting);
    } else if (message.includes('what') || message.includes('about') || message.includes('techieblog')) {
      return getRandomResponse(botResponses.about);
    } else if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
      return getRandomResponse(botResponses.contact);
    } else if (message.includes('help') || message.includes('assist') || message.includes('support')) {
      return getRandomResponse(botResponses.help);
    } else if (message.includes('account') || message.includes('login') || message.includes('profile')) {
      return getRandomResponse(botResponses.account);
    } else if (message.includes('event') || message.includes('webinar') || message.includes('conference')) {
      return getRandomResponse(botResponses.events);
    } else {
      return getRandomResponse(botResponses.default);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };


  return (
    <footer className="relative bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
    
          <div className="space-y-2">
            <div className="">
              <Logo />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Bridging the gap between knowledge and action, TechieBlog fuels
              tech enthusiasts and developers with insights to thrive.
            </p>
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
                { name: "About Us", path: "/about-us", icon: Info },
                { name: "Feedback", path: "/feedback", icon: MessageCircle },
                { name: "Events", path: "/events", icon: CalendarDays },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="group dark:hover:text-gray-200 dark:text-gray-400 flex items-center text-gray-600 hover:text-gray-900 relative w-full text-left"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125" />
                    {item.icon && (
                      <item.icon className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    )}
                    <span className="relative">
                      {item.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

   
          <div className="space-y-6 ml-6">
            <h3 className="text-lg ml-5 dark:text-gray-200 font-bold">
              Support
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Account", path: "/login",icon: UserRound },
                { name: "FAQ", path: "/faq" , icon: HelpCircle },
                { name: "Contact Us", path: "/contact-us" , icon: Phone },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 relative w-full text-left"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125" />
                    {item.icon && (
                      <item.icon className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    )}
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
                <a href="mailto:support@techieblog.com" className="relative">
                  support@techieblog.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 dark:text-gray-400 ">
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 hover:text-orange-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 hover:text-orange-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 hover:text-orange-500" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-orange-500" />
            </a>
          </div>

          
          <p className="text-lg text-center md:text-left mt-2">           
            © {new Date().getFullYear()} TechieBlog. All Rights Reserved.
          </p>

          <div className="flex items-center space-x-2 mr-5"> 
            <UserCog className="w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300" />

            <span className="text-sm font-semibold">Contributors:</span>
            <ContributorsLink classes="w-8 h-8 hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 right-6 z-50">
        {isChatOpen && (
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 mb-4 transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-80 h-96'
          }`}>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">TechieBlog Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMinimize}
                  className="hover:bg-white/20 p-1 rounded transition-colors duration-200"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={toggleChat}
                  className="hover:bg-white/20 p-1 rounded transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.isBot
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            : 'bg-orange-500 text-white'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors duration-200"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <div
          className={`w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
            isChatOpen ? 'mb-2' : ''
          }`}
          onClick={toggleChat}
        >
          {isChatOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </div>
      </div>


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