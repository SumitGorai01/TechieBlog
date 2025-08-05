import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Heart, 
  Share2, 
  BookmarkPlus, 
  Filter,
  Search,
  TrendingUp,
  Code2,
  Brain,
  Shield,
  Cloud,
  Smartphone,
  Zap,
  ArrowRight,
  Star
} from "lucide-react";

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { name: "All", icon: <TrendingUp className="w-4 h-4" />, count: 24 },
    { name: "Web Development", icon: <Code2 className="w-4 h-4" />, count: 8 },
    { name: "AI/ML", icon: <Brain className="w-4 h-4" />, count: 6 },
    { name: "Cybersecurity", icon: <Shield className="w-4 h-4" />, count: 4 },
    { name: "Cloud Computing", icon: <Cloud className="w-4 h-4" />, count: 3 },
    { name: "Mobile Dev", icon: <Smartphone className="w-4 h-4" />, count: 3 }
  ];

  const articles = [
    {
      id: 1,
      title: "The Future of React: Server Components and Beyond",
      excerpt: "Explore the latest developments in React ecosystem including Server Components, Suspense, and what's coming next in 2025.",
      category: "Web Development",
      author: "Sarah Chen",
      authorAvatar: "SC",
      date: "2025-01-15",
      readTime: "8 min read",
      views: 2340,
      likes: 156,
      featured: true,
      tags: ["React", "JavaScript", "Frontend"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Building Scalable Microservices with Docker and Kubernetes",
      excerpt: "A comprehensive guide to containerizing applications and orchestrating them at scale using modern DevOps practices.",
      category: "Cloud Computing",
      author: "Mike Rodriguez",
      authorAvatar: "MR",
      date: "2025-01-12",
      readTime: "12 min read",
      views: 1890,
      likes: 203,
      featured: false,
      tags: ["Docker", "Kubernetes", "DevOps"],
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Machine Learning in Production: Best Practices for 2025",
      excerpt: "Learn how to deploy, monitor, and maintain ML models in production environments with real-world examples.",
      category: "AI/ML",
      author: "Dr. Emily Watson",
      authorAvatar: "EW",
      date: "2025-01-10",
      readTime: "15 min read",
      views: 3210,
      likes: 287,
      featured: true,
      tags: ["Machine Learning", "MLOps", "Python"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Zero Trust Architecture: Securing Modern Applications",
      excerpt: "Understanding and implementing Zero Trust security models to protect distributed applications and remote workforces.",
      category: "Cybersecurity",
      author: "Alex Kim",
      authorAvatar: "AK",
      date: "2025-01-08",
      readTime: "10 min read",
      views: 1560,
      likes: 124,
      featured: false,
      tags: ["Security", "Zero Trust", "Infrastructure"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Flutter vs React Native: The 2025 Comparison",
      excerpt: "An in-depth analysis of cross-platform mobile development frameworks, performance benchmarks, and use cases.",
      category: "Mobile Dev",
      author: "Lisa Park",
      authorAvatar: "LP",
      date: "2025-01-05",
      readTime: "11 min read",
      views: 2890,
      likes: 245,
      featured: false,
      tags: ["Flutter", "React Native", "Mobile"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Advanced TypeScript Patterns for Large-Scale Applications",
      excerpt: "Master advanced TypeScript techniques including conditional types, mapped types, and architectural patterns.",
      category: "Web Development",
      author: "David Thompson",
      authorAvatar: "DT",
      date: "2025-01-03",
      readTime: "14 min read",
      views: 1750,
      likes: 189,
      featured: false,
      tags: ["TypeScript", "Architecture", "Patterns"],
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=400&fit=crop"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(article => article.featured);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/10 to-slate-50 dark:from-slate-950 dark:via-slate-900/95 dark:to-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-200/20 dark:bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-200/15 dark:bg-amber-600/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-orange-600 to-slate-900 dark:from-slate-100 dark:via-orange-400 dark:to-slate-100">
              Tech
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
              {" "}Articles
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Stay ahead of the curve with in-depth articles on the latest technology trends, 
            <span className="text-orange-600 dark:text-orange-400 font-medium"> tutorials, and industry insights.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
           

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                      : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-orange-100 dark:hover:bg-orange-900/20"
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span className="text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-6xl mx-auto mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-6 h-6 mb-5 text-orange-500" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Featured Articles</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredArticles.slice(0, 2).map((article, index) => (
                <div key={article.id} className="group cursor-pointer">
                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium rounded-full">
                          {article.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {article.authorAvatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{article.author}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(article.date).toLocaleDateString()}</span>
                              <Clock className="w-3 h-3 ml-1" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>

                        <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>
            <span className="text-slate-500 dark:text-slate-400">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  layout
                  className="group cursor-pointer"
                >
                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {article.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium rounded-full">
                          {article.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {article.authorAvatar}
                          </div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">{article.author}</span>
                        </div>

                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span className="text-xs">{article.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs">{article.likes}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg transition-colors">
                            <BookmarkPlus className="w-4 h-4 text-slate-500 hover:text-orange-500" />
                          </button>
                          <button className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4 text-slate-500 hover:text-orange-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">No articles found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </motion.div>

        {filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Load More Articles
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Articles;