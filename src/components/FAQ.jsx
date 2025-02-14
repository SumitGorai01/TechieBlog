import React from "react";
import { FaUserCircle, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";
import faqImage from "../assets/faq.svg"; // Replace with actual image path

const FAQ = () => {
  const faqItems = [
    {
      type: 'question',
      content: "What is TechieBlog?",
    },
    {
      type: 'answer',
      content: "TechieBlog is your hub for the latest in technology and innovation. Stay updated with our latest posts, join the community, and share your knowledge.",
    },
    {
      type: 'question',
      content: "How often is new content published?",
    },
    {
      type: 'answer',
      content: "We publish new content weekly, ensuring you always have fresh insights and tech updates. Subscribe to our newsletter to never miss a post!",
    },
    {
      type: 'question',
      content: "How can I contribute to TechieBlog?",
    },
    {
      type: 'answer',
      content: "We welcome contributions from tech enthusiasts! You can submit your articles through our submission form. Our editorial team will review and provide feedback within 48 hours.",
    },
    {
      type: 'question',
      content: "What topics does TechieBlog cover?",
    },
    {
      type: 'answer',
      content: "We cover a wide range of tech topics including web development, AI/ML, cybersecurity, cloud computing, mobile development, and emerging technologies. Our content is carefully curated to keep you informed about the latest trends.",
    },
    {
      type: 'question',
      content: "How can I connect with other tech enthusiasts?",
    },
    {
      type: 'answer',
      content: "Join our vibrant community through our forums, comment sections, and monthly virtual meetups. We also have active social media groups where members share insights and discuss tech trends.",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mt-16"></div>
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Get answers to common questions about TechieBlog
        </p>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex justify-center lg:self-start">
  <img src={faqImage} alt="FAQ" className="w-full h-auto" />
</div>

        {/* FAQ Section */}
        <div className="w-full lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          ></motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex ${
                  item.type === "question" ? "justify-start" : "justify-end"
                } items-start gap-4`}
              >
                {item.type === "question" && (
                  <>
                    <div className="flex-shrink-0">
                      <FaUserCircle className="w-10 h-10 text-orange-400 dark:text-orange-300" />
                    </div>
                    <div className="flex-1 max-w-2xl">
                      <div className="bg-white dark:bg-gray-800 mt-2 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-200 text-lg text-left">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {item.type === "answer" && (
                  <>
                    <div className="flex-1 max-w-2xl">
                      <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-2xl rounded-tr-none shadow-sm border border-amber-100 dark:border-amber-800">
                        <p className="text-amber-800 dark:text-amber-100 text-lg text-justify">
                          {item.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <FaUserTie className="w-10 h-10 text-amber-500 dark:text-amber-400" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
