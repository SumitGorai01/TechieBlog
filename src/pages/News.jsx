import React, { useState } from 'react';
import { useEffect } from 'react';
import { Clock, Eye, MessageCircle, Share2, TrendingUp, Bookmark, Search, Filter, Calendar, User, ArrowRight, Zap, Globe, Smartphone, Cpu, Cloud, Shield } from 'lucide-react';

const TechNews = () => {

    const categories = ["All", "AI/ML", "Hardware", "Software", "Cloud", "Automotive", "Energy"];
    
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [savedArticles, setSavedArticles] = useState([]);

    const [liveNews, setLiveNews] = useState([]);

    useEffect(() => {
        const fetchLiveNews = async () => {
            try {
               const response = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=c0d62e1130ea4b69bd2a4dd41320696d`);
                const data = await response.json();
                if (data.articles) {
                    const formattedArticles = data.articles.map((article, index) => ({
                        id: `live-${index}`,
                        title: article.title,
                        excerpt: article.description || "",
                        content: article.content || "",
                        category: "Live",
                        author: article.author || "Unknown",
                        publishedAt: article.publishedAt,
                        readTime: "2 min read",
                        views: Math.floor(Math.random() * 10000),
                        comments: Math.floor(Math.random() * 100),
                        tags: ["Live", "Technology"],
                        trending: false,
                        featured: false
                    }));
                    setLiveNews(formattedArticles);
                }
            } catch (error) {
                console.error("Failed to fetch live news:", error);
            }
        };

        fetchLiveNews();
    }, []);

    const handleSaveArticle = (articleId) => {
        setSavedArticles(prev => 
            prev.includes(articleId) 
                ? prev.filter(id => id !== articleId)
                : [...prev, articleId]
        );
    };

    const filteredNews = liveNews;

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
                <div className="lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {liveNews.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live News</h2>
                                <div className="space-y-6">
                                    {liveNews.map((article) => (
                                        <article key={article.id} className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 dark:border-orange-900/20">
                                            <div className="flex gap-6">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                            <Zap className="w-3 h-3" />
                                                            Live
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{article.readTime}</span>
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="space-y-6">
                            {filteredNews.map((article) => (
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

                    <div className="space-y-8"></div>
                </div>
            </div>
        </div>
    );
};

export default TechNews;