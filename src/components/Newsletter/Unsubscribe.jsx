import { useState } from 'react';
import newsletterService from '../../appwrite/newsletter';

function Unsubscribe() {
  const [email, setEmail] = useState('');
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsUnsubscribing(true);
    setMessage('');

    try {
      await newsletterService.unsubscribe(email.trim());
      setIsSuccess(true);
      setMessage('You have been successfully unsubscribed from our newsletter.');
      setEmail('');
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.message || 'Failed to unsubscribe. Please try again.');
    } finally {
      setIsUnsubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Unsubscribe
            </h2>
            <p className="text-gray-600 dark:text-white/70">
              We&apos;re sorry to see you go. Enter your email to unsubscribe from our newsletter.
            </p>
          </div>

          {message && (
            <div className={`p-4 rounded-xl mb-6 ${
              isSuccess 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <p className={`text-sm font-medium text-center ${
                isSuccess 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {message}
              </p>
            </div>
          )}

          <form onSubmit={handleUnsubscribe} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="w-full px-6 py-4 bg-gray-50 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-400 dark:focus:border-red-400/50 transition-all duration-300"
                required
                disabled={isUnsubscribing}
              />
            </div>
            
            <button
              type="submit"
              disabled={isUnsubscribing}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isUnsubscribing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Unsubscribing...</span>
                </div>
              ) : (
                "Unsubscribe"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white/80 transition-colors duration-300"
            >
              ← Back to TechieBlog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unsubscribe;
