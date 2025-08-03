import React, { useState } from "react";
import { FaUserCircle, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import faqImage from "../assets/faq.svg"; // Replace with actual image path

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is TechieBlog?",
      answer:
        "TechieBlog is your hub for the latest in technology and innovation. Stay updated with our latest posts, join the community, and share your knowledge.",
    },
    {
      question: "How often is new content published?",
      answer:
        "We publish new content weekly, ensuring you always have fresh insights and tech updates. Subscribe to our newsletter to never miss a post!",
    },
    {
      question: "How can I contribute to TechieBlog?",
      answer:
        "We welcome contributions from tech enthusiasts! You can submit your articles through our submission form. Our editorial team will review and provide feedback within 48 hours",
    },
    {
      question: "What topics does TechieBlog cover?",
      answer:
        "We cover a wide range of tech topics including web development, AI/ML, cybersecurity, cloud computing, mobile development, and emerging technologies. Our content is carefully curated to keep you informed about the latest trends",
    },
    {
      question: "How can I connect with other tech enthusiasts?",
      answer:
        "Join our vibrant community through our forums, comment sections, and monthly virtual meetups. We also have active social media groups where members share insights and discuss tech trends.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Get answers to common questions about TechieBlog
        </p>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/3 flex justify-center lg:self-start"
        >
          <img src={faqImage} alt="FAQ" className="w-full h-auto" />
        </motion.div>

        <div className="w-full lg:w-2/3">
          <motion.div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <div
                  className="flex items-center justify-between gap-4 cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  <div className="flex items-center gap-4">
                    <FaUserCircle className="w-8 h-8 text-orange-400 dark:text-orange-300" />
                    <p className="text-gray-700 dark:text-gray-200 text-lg font-semibold">
                      {item.question}
                    </p>
                  </div>
                  {openIndex === index ? (
                    <FiChevronUp className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                  ) : (
                    <FiChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={openIndex === index ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg shadow-sm border border-amber-100 dark:border-amber-800">
                    <div className="flex items-center gap-4">
                      <FaUserTie className="w-8 h-8 text-amber-500 dark:text-amber-400" />
                      <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;