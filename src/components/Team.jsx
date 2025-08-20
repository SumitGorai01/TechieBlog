import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Globe,
  Briefcase,
  FolderOpen,
  Building2,
} from "lucide-react";
import ContributorsLink from "../components/contributors/contributorsLink.jsx";
import { Link } from "react-router-dom";
import Counter from "../components/Counter.jsx";

const teamMembers = [
  {
    name: "Sumit Gorai",
    role: "Founder & CEO | Project Admin",
    image: "https://avatars.githubusercontent.com/u/106994512?v=4",
    socials: {
      linkedin: "https://www.linkedin.com/in/sumitgorai01/",
      github: "https://github.com/SumitGorai01",
      portfolio: "https://sumitgorai-portfolio.netlify.app/",
    },
  },
  {
    name: "Tanmay Kalra",
    role: "Frontend Developer | UI/UX Designer",
    image: "https://avatars.githubusercontent.com/u/151675979?v=4",
    socials: {
      linkedin: "https://www.linkedin.com/in/tanmay-kalra-09oct/",
      github: "https://github.com/TanmayKalra09",
      portfolio: "http://portfolio-tanmay-kalra.vercel.app/",
    },
  },
  {
    name: "Unknown",
    role: "Backend Developer",
    image:
      "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
    socials: { linkedin: "#", github: "#", portfolio: "#" },
  },
];

export default function Team() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tag */}
        <motion.div
          className="inline-block mb-4 px-4 py-1 text-xs sm:text-sm rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Team
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet the Visionaries
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 sm:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A diverse group of innovators, creators, and problem-solvers united by
          our passion for building exceptional digital experiences.
        </motion.p>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 sm:mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md py-6 px-4 flex flex-col items-center">
            <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 mb-2" />
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              <Counter target={4} duration={2} suffix="+" />
            </span>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2">
              Years Combined Experience
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md py-6 px-4 flex flex-col items-center">
            <FolderOpen className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 mb-2" />
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              <Counter target={30} duration={2} suffix="+" />
            </span>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2">
              Projects Delivered
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md py-6 px-4 flex flex-col items-center">
            <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 mb-2" />
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              <Counter target={15} duration={2} suffix="+" />
            </span>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2">
              Industries Served
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="relative group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="relative z-10 p-6 flex flex-col items-center">
                {/* Avatar */}
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-orange-500 shadow-md mb-4 group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ rotate: 3 }}
                />

                {/* Name & Role */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <span className="inline-block mt-1 mb-4 px-3 py-1 text-xs sm:text-sm rounded-full bg-orange-100 text-orange-600 dark:bg-orange-600/20 dark:text-orange-300">
                  {member.role}
                </span>

                {/* Social Links */}
                <div className="flex space-x-4 sm:space-x-5">
                  {member.socials.linkedin !== "#" && (
                    <a href={member.socials.linkedin} aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors" />
                    </a>
                  )}
                  {member.socials.github !== "#" && (
                    <a href={member.socials.github} aria-label="GitHub">
                      <Github className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors" />
                    </a>
                  )}
                  {member.socials.portfolio !== "#" && (
                    <a href={member.socials.portfolio} aria-label="Portfolio">
                      <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ Contributors Section */}
        <div className="mt-16 sm:mt-20 text-center max-w-xl mx-auto px-4">
          <motion.div
            className="inline-block mb-4 px-4 py-1 text-xs sm:text-sm rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Contributors
          </motion.div>

          <motion.h3
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Brilliant Minds Behind This Project
          </motion.h3>

          <Link to="/contributors" className="inline-block">
            <ContributorsLink classes="w-10 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto" />
          </Link>

          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Click above to explore all contributors who made this project
            possible 🚀
          </p>
        </div>
      </div>
    </section>
  );
}
