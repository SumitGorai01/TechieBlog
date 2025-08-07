import React from 'react';
import { 
  FaShieldAlt, FaDatabase, FaClipboardList, FaLock, 
  FaCookieBite, FaHandshake, FaSyncAlt, FaEnvelope 
} from 'react-icons/fa';

function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mb-6 shadow-lg">
            <FaShieldAlt className="text-white text-2xl" />
          </div>
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to <span className="font-semibold text-orange-600 dark:text-orange-400">TechieBlog</span>'s Privacy Policy. 
            This policy outlines how we collect, use, and safeguard your information when you visit our website.
          </p>
        </div>

        <div className="space-y-6">
          {[
            { id: "information-collection", title: "Information Collection", text: "We may collect personal identification information such as name, email address, and usage data when you use our services.", icon: <FaDatabase /> },
            { id: "use-of-information", title: "Use of Information", text: "We use collected information to improve our services, personalize user experience, send periodic emails, and enhance site functionality.", icon: <FaClipboardList /> },
            { id: "data-protection", title: "Data Protection", text: "We adopt appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.", icon: <FaLock /> },
            { id: "cookies", title: "Cookies", text: "Our site may use cookies to enhance the user experience. You may choose to set your browser to refuse cookies.", icon: <FaCookieBite /> },
            { id: "third-party-services", title: "Third-party Services", text: "We may use third-party service providers to help operate our website, such as analytics or email services.", icon: <FaHandshake /> },
            { id: "policy-changes", title: "Policy Changes", text: "We may update this Privacy Policy from time to time. Changes will be posted on this page.", icon: <FaSyncAlt /> },
            { id: "contact-us", title: "Contact Us", text: "If you have questions about this Privacy Policy, please contact us at support@techieblog.com.", icon: <FaEnvelope /> }
          ].map((section, index) => (
            <div 
              key={section.id} 
              id={section.id} 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      {section.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full mr-4">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;