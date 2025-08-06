import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Users, BookOpen, Megaphone, HeartHandshake, Mail, TrendingUp, Award, Globe, Zap } from 'lucide-react';

const AboutUs = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { 
                type: 'spring', 
                stiffness: 100,
                damping: 12
            } 
        }
    };

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
            
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-20 right-20 w-32 h-32 bg-orange-100/20 dark:bg-orange-900/20 rounded-full blur-xl"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: '2s' }}
                    className="absolute bottom-40 left-10 w-40 h-40 bg-orange-200/15 dark:bg-orange-800/15 rounded-full blur-2xl"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: '4s' }}
                    className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-300/10 dark:bg-orange-700/10 rounded-full blur-xl"
                />
            </div>

            <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32">
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center relative z-10"
    >
        <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-600 via-orange-500 to-rose-500 dark:from-purple-400 dark:via-orange-400 dark:to-rose-300 bg-clip-text text-transparent mb-6 leading-tight"
        >
            About TechieBlog
        </motion.h1>
        
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light"
        >
            Empowering the global tech community through **cutting-edge insights**,
            <br className="hidden md:block" />
            **innovative solutions**, and **collaborative knowledge sharing**
        </motion.p>
    </motion.div>

    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-8 mt-20"
    >
        {[
            { icon: Rocket, title: 'Innovation First', text: 'Pioneering tech insights & trends', color: 'purple' },
            { icon: Users, title: '500K+ Community', text: 'Global network of tech professionals', color: 'orange' },
            { icon: BookOpen, title: '1K+ Resources', text: 'Comprehensive tech knowledge base', color: 'rose' },
        ].map((item, index) => (
            <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                    y: -8,
                    transition: { type: 'spring', stiffness: 200, damping: 10 }
                }}
                className="group relative h-full"
            >
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-${item.color}-500 to-purple-500 rounded-3xl blur-md opacity-0 group-hover:opacity-60 transition duration-500`} />
                <div className="relative h-full bg-white dark:bg-slate-800 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                    <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 dark:from-${item.color}-900/30 dark:to-${item.color}-800/30 rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-300`}>
                        <item.icon className={`w-8 h-8 text-${item.color}-600 dark:text-${item.color}-400`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
            </motion.div>
        ))}
    </motion.div>
</section>

            <section className="relative py-32 bg-gradient-to-b from-transparent to-slate-100/50 dark:to-slate-800/20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-orange-600 dark:from-slate-100 dark:to-orange-400 bg-clip-text text-transparent mb-6">
                            Our Journey of Innovation
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-8 rounded-full" />
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            From humble beginnings to a global platform that shapes the future of technology
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-16 items-center"
                    >
                        <motion.div variants={itemVariants} className="space-y-8">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                    Founded in 2023 with a vision to democratize technology knowledge, TechieBlog emerged from a passion for innovation and community building. What started as a collection of technical insights has evolved into a comprehensive platform serving millions of developers, engineers, and tech enthusiasts worldwide.
                                </p>
                                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                    Today, we stand as a beacon for those seeking to understand, create, and shape the technological landscape of tomorrow. Our commitment to quality content and community engagement has made us a trusted resource in the ever-evolving world of technology.
                                </p>
                            </div>

                            <motion.div
                                variants={containerVariants}
                                className="grid grid-cols-2 gap-6 mt-12"
                            >
                                {[
                                    { icon: TrendingUp, value: '97%', label: 'Reader Satisfaction', color: 'text-green-600' },
                                    { icon: Award, value: '50+', label: 'Expert Contributors', color: 'text-blue-600' },
                                    { icon: Globe, value: '120+', label: 'Countries Reached', color: 'text-purple-600' },
                                    { icon: Zap, value: '24/7', label: 'Community Support', color: 'text-orange-600' },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50"
                                    >
                                        <item.icon className={`w-8 h-8 mb-3 ${item.color} group-hover:scale-110 transition-transform`} />
                                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{item.value}</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">{item.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="relative"
                        >
                            <div className="relative bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-3xl p-16 min-h-[500px] flex items-center justify-center">
                                <div className="absolute top-8 right-8 w-16 h-16 bg-orange-300/30 dark:bg-orange-600/20 rounded-full" />
                                <div className="absolute bottom-8 left-8 w-12 h-12 bg-orange-400/40 dark:bg-orange-500/20 rounded-full" />
                                <div className="absolute top-1/2 left-12 w-8 h-8 bg-orange-500/50 dark:bg-orange-400/30 rounded-full" />
                                
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-8 mx-auto shadow-xl">
                                        <Rocket className="w-16 h-16 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                                        Innovation at Heart
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Driving technological progress through community-powered insights
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-32 bg-gradient-to-b from-slate-100/50 to-transparent dark:from-slate-800/20 dark:to-transparent">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-orange-600 dark:from-slate-100 dark:to-orange-400 bg-clip-text text-transparent mb-6">
                            Our Core Values
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-8 rounded-full" />
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            The fundamental principles that guide everything we do
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
                            { 
                                icon: Megaphone, 
                                title: 'Educate', 
                                description: 'Comprehensive technical guides and tutorials',
                                color: 'from-orange-500 to-orange-600',
                                bgColor: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30'
                            },
                            { 
                                icon: BookOpen, 
                                title: 'Inform', 
                                description: 'Latest industry news and emerging trends',
                                color: 'from-rose-500 to-rose-600',
                                bgColor: 'from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30'
                            },
                            { 
                                icon: HeartHandshake, 
                                title: 'Inspire', 
                                description: 'Innovation showcases and success stories',
                                color: 'from-amber-500 to-amber-600',
                                bgColor: 'from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30'
                            },
                            { 
                                icon: Users, 
                                title: 'Engage', 
                                description: 'Community discussions and collaboration',
                                color: 'from-emerald-500 to-emerald-600',
                                bgColor: 'from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30'
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ 
                                    y: -10,
                                    transition: { type: 'spring', stiffness: 300 }
                                }}
                                className="group relative"
                            >
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
                                <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 text-center h-full">
                                    <div className={`w-20 h-20 bg-gradient-to-br ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative py-32 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-orange-600/10 to-orange-500/5 dark:from-orange-400/5 dark:via-orange-500/10 dark:to-orange-400/5" />
                
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.04]" />
                </div>

                <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-orange-600 dark:from-slate-100 dark:to-orange-400 bg-clip-text text-transparent mb-6">
                            Join Our Tech Community
                        </h2>
                        
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-8 rounded-full" />
                        
                        <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6 max-w-3xl mx-auto">
                            Stay at the forefront of technology with exclusive insights, connect with industry experts, and be part of conversations that shape the future.
                        </p>
                        
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
                            Join thousands of tech professionals on our Discord server for real-time discussions and networking opportunities.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <motion.a
                                href="#"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Users className="w-5 h-5" />
                                Join Our Discord
                            </motion.a>
                            
                            <motion.a
                                href="#"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Mail className="w-5 h-5" />
                                Subscribe to Newsletter
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default AboutUs;