import React, { useState } from 'react';
import { Clock, Eye, MessageCircle, Share2, TrendingUp, Bookmark, Search, Filter, Calendar, User, ArrowRight, Zap, Globe, Smartphone, Cpu, Cloud, Shield } from 'lucide-react';

const TechNews = () => {
    const newsData = [
        {
            id: 1,
            title: "Apple Unveils Revolutionary M4 Chip with Enhanced AI Capabilities",
            excerpt: "Apple's latest M4 processor brings unprecedented performance improvements and integrated AI acceleration, setting new benchmarks for mobile computing.",
            content: "Apple has officially announced its next-generation M4 chip, featuring a revolutionary architecture that combines traditional computing power with advanced AI acceleration. The new chip boasts a 40% performance increase over its predecessor while consuming 25% less power.",
            category: "Hardware",
            author: "Sarah Johnson",
            publishedAt: "2024-08-06T10:30:00Z",
            readTime: "3 min read",
            views: 12540,
            comments: 89,

            tags: ["Apple", "M4 Chip", "AI", "Performance"],
            trending: true,
            featured: true
        },
        {
            id: 2,
            title: "OpenAI Announces GPT-5: The Next Generation of Language Models",
            excerpt: "The highly anticipated GPT-5 promises to deliver human-level reasoning capabilities and multimodal understanding across text, images, and audio.",
            content: "OpenAI has revealed details about GPT-5, their most advanced language model yet. The new model demonstrates remarkable improvements in reasoning, creativity, and understanding of complex contexts.",
            category: "AI/ML",
            author: "Michael Chen",
            publishedAt: "2024-08-06T08:15:00Z",
            readTime: "5 min read",
            views: 18750,
            comments: 234,

            tags: ["OpenAI", "GPT-5", "Language Models", "AI"],
            trending: true,
            featured: false
        },
        {
            id: 3,
            title: "Tesla's New Autopilot Update Enables Full Self-Driving in Cities",
            excerpt: "Tesla rolls out its most comprehensive autonomous driving update, bringing full self-driving capabilities to urban environments worldwide.",
            content: "Tesla's latest over-the-air update introduces advanced neural networks that can handle complex city driving scenarios, including traffic lights, pedestrians, and construction zones.",
            category: "Automotive",
            author: "Emma Rodriguez",
            publishedAt: "2024-08-06T06:45:00Z",
            readTime: "4 min read",
            views: 9320,
            comments: 156,

            tags: ["Tesla", "Autopilot", "Self-Driving", "Neural Networks"],
            trending: false,
            featured: false
        },
        {
            id: 4,
            title: "Google Cloud Introduces Quantum Computing Service for Enterprises",
            excerpt: "Google makes quantum computing accessible to businesses with a new cloud-based platform offering unprecedented computational power for complex problems.",
            content: "Google Cloud's new quantum computing service allows enterprises to access quantum processors through the cloud, opening new possibilities for drug discovery, financial modeling, and cryptography.",
            category: "Cloud",
            author: "David Park",
            publishedAt: "2024-08-05T16:20:00Z",
            readTime: "6 min read",
            views: 7890,
            comments: 67,

            tags: ["Google Cloud", "Quantum Computing", "Enterprise", "Cloud Services"],
            trending: true,
            featured: false
        },
        {
            id: 5,
            title: "Microsoft Teams Integrates Advanced AI Assistant for Enhanced Productivity",
            excerpt: "Microsoft's new AI-powered assistant in Teams can summarize meetings, generate action items, and provide real-time language translation.",
            content: "The new AI assistant leverages Microsoft's Copilot technology to transform how teams collaborate, offering intelligent meeting summaries and automated task management.",
            category: "Software",
            author: "Lisa Wang",
            publishedAt: "2024-08-05T14:10:00Z",
            readTime: "3 min read",
            views: 11200,
            comments: 92,

            tags: ["Microsoft Teams", "AI Assistant", "Productivity", "Copilot"],
            trending: false,
            featured: false
        },
        {
            id: 6,
            title: "Samsung Reveals Breakthrough in Solid-State Battery Technology",
            excerpt: "Samsung's new solid-state batteries promise 10-minute charging times and 1000-mile range for electric vehicles, revolutionizing energy storage.",
            content: "Samsung SDI has developed a revolutionary solid-state battery that could transform electric vehicles and mobile devices with ultra-fast charging and extended lifespan.",
            category: "Energy",
            author: "James Kim",
            publishedAt: "2024-08-05T11:30:00Z",
            readTime: "4 min read",
            views: 15600,
            comments: 178,

            tags: ["Samsung", "Solid-State Battery", "Electric Vehicles", "Energy Storage"],
            trending: true,
            featured: false
        }
    ];

    const categories = ["All", "AI/ML", "Hardware", "Software", "Cloud", "Automotive", "Energy"];
    
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [savedArticles, setSavedArticles] = useState([]);

    const handleSaveArticle = (articleId) => {
        setSavedArticles(prev => 
            prev.includes(articleId) 
                ? prev.filter(id => id !== articleId)
                : [...prev, articleId]
        );
    };

    const filteredNews = newsData.filter(article => {
        const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const featuredArticle = newsData.find(article => article.featured);
    const trendingArticles = newsData.filter(article => article.trending && !article.featured).slice(0, 3);
    const regularArticles = filteredNews.filter(article => !article.featured);

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'AI/ML': return <Zap className="w-4 h-4" />;
            case 'Hardware': return <Cpu className="w-4 h-4" />;
            case 'Software': return <Globe className="w-4 h-4" />;
            case 'Cloud': return <Cloud className="w-4 h-4" />;
            case 'Automotive': return <Smartphone className="w-4 h-4" />;
            case 'Energy': return <Shield className="w-4 h-4" />;
            default: return <Globe className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-amber-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-orange-100 dark:border-orange-900/20 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl mt-6 font-bold text-gray-900 dark:text-white">Tech News</h1>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                                selectedCategory === category
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                                    : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 border border-orange-200 dark:border-orange-800'
                            }`}
                        >
                            {getCategoryIcon(category)}
                            <span>{category}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                       

                        <div className="space-y-6">
                            {regularArticles.map((article) => (
                                <article key={article.id} className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 dark:border-orange-900/20">
                                    <div className="flex gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg ${
                                                    article.trending 
                                                        ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                                        : 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                                                }`}>
                                                    {article.trending && <TrendingUp className="w-3 h-3" />}
                                                    {getCategoryIcon(article.category)}
                                                    {article.category}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {article.readTime}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                            
                                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                                                {article.excerpt}
                                            </p>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {article.author}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {formatDate(article.publishedAt)}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-3 h-3" />
                                                        {article.views.toLocaleString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MessageCircle className="w-3 h-3" />
                                                        {article.comments}
                                                    </span>
                                                    <button
                                                        onClick={() => handleSaveArticle(article.id)}
                                                        className={`p-1 rounded transition-colors ${
                                                            savedArticles.includes(article.id)
                                                                ? 'text-orange-600'
                                                                : 'hover:text-orange-500'
                                                        }`}
                                                    >
                                                        <Bookmark className={`w-3 h-3 ${savedArticles.includes(article.id) ? 'fill-current' : ''}`} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-orange-100 dark:border-orange-900/20">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-orange-500" />
                                Trending Now
                            </h3>
                            <div className="space-y-4">
                                {trendingArticles.map((article, index) => (
                                    <div key={article.id} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0">
                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer">
                                                {article.title}
                                            </h4>
                                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" />
                                                    {article.views.toLocaleString()}
                                                </span>
                                                <span>{formatDate(article.publishedAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-orange-100 dark:border-orange-900/20">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Popular Categories</h3>
                            <div className="space-y-3">
                                {categories.filter(cat => cat !== 'All').map((category) => {
                                    const count = newsData.filter(article => article.category === category).length;
                                    return (
                                        <div key={category} className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                                                    {getCategoryIcon(category)}
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white">{category}</span>
                                            </div>
                                            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechNews;