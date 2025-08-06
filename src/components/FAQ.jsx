import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, Users, Code, Globe, Calendar, Sparkles } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is TechieBlog?",
      answer: "TechieBlog is your hub for the latest in technology and innovation. Stay updated with our latest posts, join the community, and share your knowledge.",
      icon: <Globe className="w-5 h-5" />,
      gradient: "from-orange-500 to-red-500"
    },
    {
      question: "How often is new content published?",
      answer: "We publish new content weekly, ensuring you always have fresh insights and tech updates. Subscribe to our newsletter to never miss a post!",
      icon: <Calendar className="w-5 h-5" />,
      gradient: "from-orange-500 to-amber-500"
    },
    {
      question: "How can I contribute to TechieBlog?",
      answer: "We welcome contributions from tech enthusiasts! You can submit your articles through our submission form. Our editorial team will review and provide feedback within 48 hours",
      icon: <Code className="w-5 h-5" />,
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      question: "What topics does TechieBlog cover?",
      answer: "We cover a wide range of tech topics including web development, AI/ML, cybersecurity, cloud computing, mobile development, and emerging technologies. Our content is carefully curated to keep you informed about the latest trends",
      icon: <MessageCircle className="w-5 h-5" />,
      gradient: "from-orange-500 to-pink-500"
    },
    {
      question: "How can I connect with other tech enthusiasts?",
      answer: "Join our vibrant community through our forums, comment sections, and monthly virtual meetups. We also have active social media groups where members share insights and discuss tech trends.",
      icon: <Users className="w-5 h-5" />,
      gradient: "from-orange-500 to-purple-500"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-slate-50 dark:from-slate-950 dark:via-slate-900/95 dark:to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200/30 dark:bg-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-200/20 dark:bg-amber-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100/30 dark:bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-orange-600 to-slate-900 dark:from-slate-100 dark:via-orange-400 dark:to-slate-100">
              Frequently Asked
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
              Questions
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about TechieBlog. Can't find what you're looking for? 
            <span className="text-orange-600 dark:text-orange-400 font-medium"> Get in touch with our team.</span>
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-4"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div
                  className="flex items-center justify-between p-6 cursor-pointer select-none"
                  onClick={() => toggleAnswer(index)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                      {item.question}
                    </h3>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors duration-300"
                  >
                    <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="ml-16 p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50 rounded-xl border border-orange-200/50 dark:border-orange-800/30">
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-orange-100 mb-6 text-lg">
              Our team is here to help you get the most out of TechieBlog
            </p>
            <Link to="/contact-us">
              <button className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Contact Support
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;