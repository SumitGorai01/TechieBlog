import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Plus, 
  Edit3, 
  Tag, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Settings,
  Home,
  Eye,
  Clock,
  Mail,
  ChevronRight
} from 'lucide-react';

const TechieBlogDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState({});

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, hasSubmenu: false },
    { 
      id: 'posts', 
      label: 'Posts', 
      icon: FileText, 
      hasSubmenu: true,
      submenu: [
        { id: 'all-posts', label: 'All Posts' },
        { id: 'add-post', label: 'Add New Post' },
        { id: 'drafts', label: 'Drafts' }
      ]
    },
    { id: 'categories', label: 'Categories & Tags', icon: Tag, hasSubmenu: false },
    { id: 'comments', label: 'Comments', icon: MessageSquare, hasSubmenu: false },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, hasSubmenu: false },
    { id: 'subscribers', label: 'Subscribers', icon: Users, hasSubmenu: false },
    { id: 'monetization', label: 'Monetization', icon: DollarSign, hasSubmenu: false },
    { id: 'settings', label: 'Settings', icon: Settings, hasSubmenu: false }
  ];

  const statsCards = [
    { title: 'Total Articles', value: '124', icon: FileText, change: '+12%', color: 'orange' },
    { title: 'Monthly Views', value: '45.2K', icon: Eye, change: '+23%', color: 'blue' },
    { title: 'Comments Pending', value: '18', icon: MessageSquare, change: '+5', color: 'yellow' },
    { title: 'Subscribers', value: '2,847', icon: Users, change: '+156', color: 'green' },
    { title: 'Revenue', value: '$1,234', icon: DollarSign, change: '+8%', color: 'purple' },
    { title: 'Avg. Read Time', value: '4.2 min', icon: Clock, change: '+0.3', color: 'pink' }
  ];

  const recentPosts = [
    { title: 'Getting Started with React Hooks', views: '2.3K', comments: 45, status: 'Published' },
    { title: 'JavaScript ES2023 New Features', views: '1.8K', comments: 32, status: 'Published' },
    { title: 'Building Responsive UIs with Tailwind', views: '892', comments: 12, status: 'Draft' }
  ];

  const SidebarItem = ({ item }) => {
    const IconComponent = item.icon;
    const isExpanded = expandedMenus[item.id] || false;
    
    const handleClick = () => {
      if (item.hasSubmenu) {
        setExpandedMenus(prev => ({
          ...prev,
          [item.id]: !prev[item.id]
        }));
      } else {
        setActiveSection(item.id);
      }
    };
    
    return (
      <div className="mb-1">
        <button
          onClick={handleClick}
          className={`w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200 ${
            activeSection === item.id
              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400'
          }`}
        >
          <div className="flex items-center space-x-3">
            <IconComponent size={18} />
            <span className="font-medium">{item.label}</span>
          </div>
          {item.hasSubmenu && (
            <ChevronRight 
              size={16} 
              className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          )}
        </button>
        
        {item.hasSubmenu && isExpanded && (
          <div className="ml-6 mt-1 space-y-1">
            {item.submenu.map((subItem) => (
              <button
                key={subItem.id}
                onClick={() => setActiveSection(subItem.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === subItem.id
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400'
                }`}
              >
                {subItem.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const StatCard = ({ card }) => {
    const IconComponent = card.icon;
    const colorClasses = {
      orange: 'bg-orange-500',
      blue: 'bg-blue-500',
      yellow: 'bg-yellow-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500'
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${colorClasses[card.color]}`}>
            <IconComponent size={20} className="text-white" />
          </div>
          <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
            {card.change}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{card.value}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{card.title}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            <span className="text-orange-500">User's </span>Dashboard
          </h1>
        </div>
        
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Welcome back! Here's what's happening with your blog.</p>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 shadow-sm">
              <Plus size={18} />
              <span>New Post</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <StatCard key={index} card={card} />
            ))}
          </div>

          <div className="lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Posts</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-white mb-1">{post.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Eye size={14} />
                            <span>{post.views}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageSquare size={14} />
                            <span>{post.comments}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'Published' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        }`}>
                          {post.status}
                        </span>
                        <button className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
                          <Edit3 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                    <Plus size={18} />
                    <span>Write New Post</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <TrendingUp size={18} />
                    <span>View Analytics</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <Mail size={18} />
                    <span>Send Newsletter</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <MessageSquare size={18} />
                    <span>Moderate Comments</span>
                  </button>
                </div>
              </div>
            </div> */}
          </div>

          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <MessageSquare size={14} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">New comment on "React Hooks Tutorial"</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">John Doe left a comment • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <Users size={14} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">5 new subscribers joined</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Newsletter subscribers increased • 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                    <FileText size={14} className="text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">Article published successfully</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">"JavaScript ES2023 Features" went live • 6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TechieBlogDashboard;