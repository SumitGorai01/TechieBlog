import React from 'react';
import { FaBook, FaExclamationCircle, FaBan, FaCheckCircle, FaLink, FaEdit, FaGavel } from 'react-icons/fa';

function Terms() {
  const tableOfContents = [
    { id: "terms", text: "Terms", icon: <FaBook /> },
    { id: "disclaimer", text: "Disclaimer", icon: <FaExclamationCircle /> },
    { id: "limitations", text: "Limitations", icon: <FaBan /> },
    { id: "accuracy", text: "Accuracy of Materials", icon: <FaCheckCircle /> },
    { id: "links", text: "Links", icon: <FaLink /> },
    { id: "modifications", text: "Modifications", icon: <FaEdit /> },
    { id: "governing-law", text: "Governing Law", icon: <FaGavel /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mb-6 shadow-lg">
            <FaGavel className="text-white text-2xl" />
          </div>
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to <span className="font-semibold text-orange-600 dark:text-orange-400">TechieBlog</span>, accessible at techieblog.com. 
            By accessing and using this Blog, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </div>


        <div className="space-y-6">
          {[
            { 
              id: "terms", 
              title: "Terms", 
              text: "By accessing this website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
              icon: <FaBook />
            },
            { 
              id: "disclaimer", 
              title: "Disclaimer", 
              text: "The materials on TechieBlog's website are provided on an 'as is' basis. TechieBlog makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
              icon: <FaExclamationCircle />
            },
            { 
              id: "limitations", 
              title: "Limitations", 
              text: "In no event shall TechieBlog or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TechieBlog's website, even if TechieBlog or a TechieBlog authorized representative has been notified orally or in writing of the possibility of such damage.",
              icon: <FaBan />
            },
            { 
              id: "accuracy", 
              title: "Accuracy of Materials", 
              text: "The materials appearing on TechieBlog's website could include technical, typographical, or photographic errors. TechieBlog does not warrant that any of the materials on its website are accurate, complete or current. TechieBlog may make changes to the materials contained on its website at any time without notice.",
              icon: <FaCheckCircle />
            },
            { 
              id: "links", 
              title: "Links", 
              text: "TechieBlog has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TechieBlog of the site. Use of any such linked website is at the user's own risk.",
              icon: <FaLink />
            },
            { 
              id: "modifications", 
              title: "Modifications", 
              text: "TechieBlog may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service. We recommend checking this page regularly for any updates.",
              icon: <FaEdit />
            },
            { 
              id: "governing-law", 
              title: "Governing Law", 
              text: "These terms and conditions are governed by and construed in accordance with the laws of our country and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location. Any disputes arising from these terms will be resolved through binding arbitration.",
              icon: <FaGavel />
            }
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

export default Terms;