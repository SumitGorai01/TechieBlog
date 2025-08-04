import { useEffect, useState } from 'react';
import { Search, Users, Github, Award } from 'lucide-react';
import { getContributors } from '../components/contributors/contribution.js';

function Contributors() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfetti, setShowConfetti] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const res = await getContributors({});
            if (res) {
                setData(res);
            }
        } catch (error) {
            console.error('Error fetching contributors:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter((item) =>
        item.login.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const topContributor = data.length > 0 ? data.reduce((prev, current) => 
        (prev.contributions > current.contributions) ? prev : current
    ) : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="relative overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
                                <div className="relative bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg border border-orange-100 dark:border-orange-900/50">
                                    <Users className="w-12 h-12 text-orange-500" />
                                </div>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-orange-600 to-amber-600 dark:from-white dark:via-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-6">
                            Contributors
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Meet the amazing developers who have shaped this project with their dedication and expertise
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100/50 dark:border-orange-900/30">
                        <div className="flex items-center">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Contributors</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{data.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100/50 dark:border-orange-900/30">
                        <div className="flex items-center">
                            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                                <Github className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Contributions</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {data.reduce((sum, contributor) => sum + contributor.contributions, 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {topContributor && (
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200/50 dark:border-orange-800/50">
                            <div className="flex items-center">
                                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Top Contributor</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{topContributor.login}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search contributors..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all duration-200 shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse mb-3"></div>
                                <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                        {filteredData.map((contributor, index) => (
                            <a
                                key={contributor.id}
                                href={contributor.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center transform transition-all duration-300 hover:scale-105"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative mb-4">
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                                    
                                    <div className="relative">
                                        <img
                                            src={contributor.avatar_url}
                                            alt={`${contributor.login}'s avatar`}
                                            className="w-20 h-20 rounded-full border-3 border-white dark:border-slate-700 shadow-lg group-hover:border-orange-300 dark:group-hover:border-orange-600 transition-all duration-300"
                                        />
                                        
                                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                                            {contributor.contributions}
                                        </div>
                                    </div>
                                </div>
                                
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 text-center px-2">
                                    {contributor.login}
                                </span>
                            </a>
                        ))}
                    </div>
                )}

                {!isLoading && filteredData.length === 0 && (
                    <div className="text-center py-16">
                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-lg">No contributors found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Contributors;