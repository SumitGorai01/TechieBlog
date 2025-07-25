import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Users, BookOpen, Megaphone, HeartHandshake, Mail} from 'lucide-react';

const AboutUs = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500 dark:from-orange-400 dark:to-rose-400 mb-6 leading-normal py-1"
                    >
                        About TechieBlog
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Empowering the tech community through knowledge sharing and innovation
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-3 gap-8 mt-16"
                >
                    {[
                        { icon: Rocket, title: 'Innovation Driven', text: 'Pioneering tech insights since 2023' },
                        { icon: Users, title: '500K+ Readers', text: 'Global community of tech enthusiasts' },
                        { icon: BookOpen, title: '1K+ Articles', text: 'Curated tech knowledge base' },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <item.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{item.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Story Section */}
            <section className="bg-white dark:bg-gray-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-rose-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative bg-gray-100 dark:bg-gray-700 rounded-2xl p-8 h-full"
                            >
                                <img 
                                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTRpbWJrNW9zcnZkdXk5M2llc3l3eGIxdmdxZnp4NDFpdmRibzV0MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qgQUggAC3Pfv687qPC/giphy.gif"
                                    alt="Tech Blog Innovation" 
                                    className="w-full h-[400px] object-cover rounded-xl shadow-lg"
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500 dark:from-orange-400 dark:to-rose-400">
                                Our Journey
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                Born from a passion for technology in 2023, TechieBlog started as a small blog in a home office. 
                                Today, we've grown into a trusted platform serving millions of readers worldwide, delivering 
                                cutting-edge tech insights and fostering a global community of innovators.
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">Milestones Achieved</span>
                                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                            </div>
                            <motion.div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: '97%', label: 'Reader Satisfaction' },
                                    { value: '50+', label: 'Expert Contributors' },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="p-4 bg-orange-50 dark:bg-gray-700 rounded-xl"
                                    >
                                        <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{item.value}</span>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1">{item.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500 dark:from-orange-400 dark:to-rose-400 mb-4">
                        Our Core Values
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        The principles that guide every article we publish
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {[
                        { icon: Megaphone, title: 'Educate', color: 'text-orange-500' },
                        { icon: BookOpen, title: 'Inform', color: 'text-rose-500' },
                        { icon: HeartHandshake, title: 'Inspire', color: 'text-amber-500' },
                        { icon: Users, title: 'Engage', color: 'text-emerald-500' },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
                            <h3 className="text-xl font-semibold text-center mb-2 dark:text-white">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center">
                                {['Deep technical guides', 'Latest industry news', 'Innovation showcases', 'Community discussions'][index]}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* CTA Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r bg-white dark:bg-grey-800 py-20 relative overflow-hidden"
            >
                {/* Add subtle background pattern */}
                <div className="absolute inset-0 bg-grid-white/[0.1] pointer-events-none" />
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500 dark:from-orange-400 dark:to-rose-400"
                    >
                        Join Our Tech Community
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                        Stay updated with the latest tech trends and join discussions with like-minded professionals.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                        Follow our socials below!
                    </motion.p>
                </div>
            </motion.section>
        </div>
    );
};

export default AboutUs;
