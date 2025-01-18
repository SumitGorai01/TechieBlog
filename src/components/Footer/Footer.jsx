import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, ArrowUp, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

const Logo = () => (
  <div className="font-bold text-3xl text-gray-900 dark:text-white">
    TechieBlog
  </div>
);

const FooterLink = ({ href, children }) => (
  <li>
    <Link 
      to={href} 
      className="group flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base transition-colors duration-200"
    >
      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      {children}
    </Link>
  </li>
);

const ContactItem = ({ icon: Icon, children }) => (
  <li className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 group hover:text-gray-900 transition-colors duration-200">
    <Icon className="w-5 h-5 text-blue-500 group-hover:text-blue-600 flex-shrink-0" />
    <span className="text-base">{children}</span>
  </li>
);

const SocialIcon = ({ href, icon: Icon }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-transform duration-200 hover:scale-110"
  >
    <Icon className="w-5 h-5" />
  </a>
);

const ImprovedFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-600 dark:text-gray-400 text-base">
              Empowering developers and tech enthusiasts with cutting-edge insights and knowledge.
            </p>
            <div className="flex space-x-3">
              <SocialIcon href="#" icon={Facebook} />
              <SocialIcon href="#" icon={Twitter} />
              <SocialIcon href="#" icon={Instagram}/>
              <SocialIcon href="#" icon={Linkedin} />
              <SocialIcon href="#" icon={Youtube} />
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/affiliate-program">Affiliate Program</FooterLink>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Support</h3>
            <ul className="space-y-3">
              <FooterLink href="/account">My Account</FooterLink>
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/contact-us">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Get in Touch</h3>
            <ul className="space-y-3">
              <ContactItem icon={MapPin}>123 Tech Street, Digital City</ContactItem>
              <ContactItem icon={Phone}>+1 (555) 123-4567</ContactItem>
              <ContactItem icon={Mail}>
                <a href="mailto:support@techieblog.com" className="hover:underline">
                  support@techieblog.com
                </a>
              </ContactItem>
            </ul>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-base"
                aria-label="Email for newsletter"
              />
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-base font-semibold"
              >
                Subscribe to Newsletter
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 mt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-base">
              © {new Date().getFullYear()} TechieBlog. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 text-base">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 text-base">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default ImprovedFooter;