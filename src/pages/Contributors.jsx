import { useEffect, useState } from 'react';
import { getContributors } from '../components/contributors/contribution.js';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { Spinner } from '../components/Spinner';
import { Tooltip } from 'react-tooltip';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Contributors() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfetti, setShowConfetti] = useState(true);
    const { width, height } = useWindowSize();
    const [searchQuery, setSearchQuery] = useState('');

    const getData = async () => {
        try {
            const res = await getContributors({});
            if (res) {
                setData(res);
            }
        } catch (err) {
            setError('Failed to fetch contributors');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const filteredData = data.filter((item) =>
        item.login.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-orange-50 to-red-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen relative">
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={200}
                    colors={['#f97316', '#ea580c', '#FFB800', '#FF3D00']} // Orange theme colors
                />
            )}
            <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">
                <span className="text-4xl font-bold mb-6 text-orange-600 dark:text-gray-100" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                    Contributors
                </span>
            </h1>
            <p className="text-lg mb-8 text-center text-gray-700 dark:text-gray-300">
                Meet the brilliant minds who brought this project to life!
            </p>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contributors..."
                className="mb-8 p-2 w-full max-w-md mx-auto block border rounded-md dark:bg-gray-700 dark:text-white"
            />
            
            {loading ? (
                <Skeleton count={10} height={150} />
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {filteredData.map((item) => (
                        <a
                            key={item.id}
                            href={item.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Contributor ${item.login}`}
                            className="group flex flex-col items-center hover:transform hover:scale-105 transition-all duration-200 ease-in-out"
                        >
                            <div className="relative">
                                <img
                                    src={item.avatar_url}
                                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-gray-200 group-hover:border-orange-500 transition-colors duration-200"
                                    alt={`${item.login}'s avatar`}
                                />
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs sm:text-sm md:text-base font-bold px-2 py-1 rounded-full min-w-[1.5rem] text-center">
                                    {item.contributions}
                                </span>
                                <Tooltip content={`Contributions: ${item.contributions}`} />
                            </div>
                            <span className="mt-2 text-gray-700 dark:text-white font-medium group-hover:text-orange-500 transition-colors duration-200">
                                {item.login}
                            </span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Contributors;