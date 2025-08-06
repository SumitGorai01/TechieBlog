import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Wifi, Settings, Search, MoreVertical, Moon, Sun } from 'lucide-react';

export default function Chatbox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'DevMaster',
      message: 'Anyone working with the new React 18 concurrent features? I\'m curious about the performance improvements everyone is seeing.',
      time: '2:30 PM',
      avatar: 'DM',
      isCurrentUser: false,
      status: 'online'
    },
    {
      id: 2,
      user: 'CodeNinja',
      message: 'Yeah! The automatic batching is a game changer for performance. Reduced re-renders by like 40% in my last project! 🚀',
      time: '2:32 PM',
      avatar: 'CN',
      isCurrentUser: false,
      status: 'online'
    },
    {
      id: 3,
      user: 'You',
      message: 'I\'ve been experimenting with Suspense boundaries. Pretty smooth! The loading states are so much cleaner now.',
      time: '2:33 PM',
      avatar: 'YU',
      isCurrentUser: true,
      status: 'online'
    },
    {
      id: 4,
      user: 'TechGuru',
      message: 'Has anyone tried the new CSS container queries yet? They\'re finally getting good browser support across all major browsers.',
      time: '2:35 PM',
      avatar: 'TG',
      isCurrentUser: false,
      status: 'online'
    },
    {
      id: 5,
      user: 'FullStackDev',
      message: 'Container queries are amazing! No more media query hacks 🎉 Finally responsive components instead of responsive pages!',
      time: '2:36 PM',
      avatar: 'FS',
      isCurrentUser: false,
      status: 'away'
    },
    {
      id: 6,
      user: 'UIDesigner',
      message: 'Speaking of CSS, has anyone played around with the new :has() selector? It\'s like having a parent selector finally!',
      time: '2:38 PM',
      avatar: 'UI',
      isCurrentUser: false,
      status: 'online'
    },
    {
      id: 7,
      user: 'BackendBoss',
      message: 'Just deployed our microservices to Kubernetes. The auto-scaling is working beautifully under load! 💪',
      time: '2:40 PM',
      avatar: 'BB',
      isCurrentUser: false,
      status: 'online'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [onlineUsers] = useState(24);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        message: inputMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: 'YU',
        isCurrentUser: true,
        status: 'online'
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'busy': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-orange-100 dark:border-gray-700 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">#</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Techie Blog Chat
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                <span>General Discussion</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Active now</span>
                </span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <Wifi className="w-4 h-4 text-green-500" />
              <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{onlineUsers} online</span>
            </div>
            
            <div className="flex items-center space-x-2">
             
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-orange-200 dark:scrollbar-thumb-gray-600">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-4 ${
              msg.isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
            } group`}
          >
            <div className="relative flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg ${
                  msg.isCurrentUser
                    ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700'
                    : 'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700'
                }`}
              >
                {msg.avatar}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(msg.status)} rounded-full border-2 border-white dark:border-gray-900`}></div>
            </div>

            <div className={`max-w-md lg:max-w-lg xl:max-w-xl ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}>
              <div className={`flex items-center space-x-2 mb-2 ${msg.isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <span className={`text-sm font-semibold ${
                  msg.isCurrentUser 
                    ? 'text-orange-600 dark:text-orange-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {msg.user}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(msg.status)} text-white opacity-0 group-hover:opacity-100 transition-opacity`}>
                  {msg.status}
                </span>
              </div>
              
              <div
                className={`px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                  msg.isCurrentUser
                    ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white rounded-br-md ml-auto'
                    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
        
        
        
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-orange-100 dark:border-gray-700 px-6 py-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
              placeholder="Type your message..."
              className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200 shadow-inner"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500">
              Press Enter ⏎
            </div>
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="w-14 h-14 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 disabled:from-gray-300 disabled:via-gray-400 disabled:to-gray-500 dark:disabled:from-gray-600 dark:disabled:via-gray-700 dark:disabled:to-gray-800 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-md transform hover:scale-105 active:scale-95"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>💬 {messages.length} messages</span>
            <span>👥 {onlineUsers} members online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}