import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "John Doe",
    role: "Full Stack Developer",
    image: "https://via.placeholder.com/150",
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "Jane Smith",
    role: "UI/UX Designer",
    image: "https://via.placeholder.com/150",
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "Mike Johnson",
    role: "Backend Developer",
    image: "https://via.placeholder.com/150",
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
];

export default function Team() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Top Tag */}
        <motion.div
          className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Team
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet the Visionaries
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A diverse group of innovators, creators, and problem-solvers united by
          our passion for building exceptional digital experiences.
        </motion.p>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md py-6 px-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              50+
            </span>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Years Combined Experience
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md py-6 px-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              100+
            </span>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Projects Delivered
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md py-6 px-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              15+
            </span>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Industries Served
            </p>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
                  className="w-28 h-28 rounded-full object-cover border-4 border-orange-500 shadow-md mb-4 group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ rotate: 3 }}
                />

                {/* Name & Role */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <span className="inline-block mt-1 mb-4 px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-600 dark:bg-orange-600/20 dark:text-orange-300">
                  {member.role}
                </span>

                {/* Social Links */}
                <div className="flex space-x-5">
                  {Object.entries(member.socials).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                      aria-label={platform}
                    >
                      <i className={`fab fa-${platform} text-lg`} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
