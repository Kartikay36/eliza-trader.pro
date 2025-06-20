import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Calendar, Tag, Video, FileText, TrendingUp, Edit, Trash2, Eye, LogOut } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import NewsEditor from '../components/NewsEditor';
import { useToast } from '../hooks/use-toast';

interface NewsPost {
  id: string;
  title: string;
  content: string;
  type: 'video' | 'news' | 'insight' | 'announcement';
  videoUrl?: string;
  createdAt: string;
  author: string;
  tags: string[];
  featured: boolean;
}

const News = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All Updates', icon: TrendingUp },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'news', label: 'Market News', icon: FileText },
    { id: 'insight', label: 'Market Insights', icon: TrendingUp },
    { id: 'announcement', label: 'Announcements', icon: Tag }
  ];

  useEffect(() => {
    // Check admin status from sessionStorage
    const authToken = sessionStorage.getItem('authToken');
    const userRole = sessionStorage.getItem('userRole');
    setIsAdmin(!!authToken && userRole === 'admin');

    // Load posts from localStorage
    const savedPosts = localStorage.getItem('newsPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initial demo posts
      const demoNews: NewsPost[] = [
        {
          id: '1',
          title: 'Bitcoin Breaks $45,000 - Technical Analysis',
          content: 'Comprehensive analysis of Bitcoin\'s recent price action and what it means for traders.',
          type: 'insight',
          createdAt: '2024-01-15T10:30:00Z',
          author: 'Elizabeth Trader',
          tags: ['Bitcoin', 'Technical Analysis', 'Crypto'],
          featured: true
        },
        {
          id: '2',
          title: 'Weekly Market Update: Crypto Trends',
          content: 'This week we saw significant movements in the crypto market.',
          type: 'news',
          createdAt: '2024-01-14T15:20:00Z',
          author: 'Elizabeth Trader',
          tags: ['Weekly Update', 'Market Analysis'],
          featured: false
        },
        {
          id: '3',
          title: 'Advanced Binary Options Strategy Video',
          content: 'Learn advanced binary options strategies in this comprehensive video tutorial.',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          createdAt: '2024-01-13T09:00:00Z',
          author: 'Elizabeth Trader',
          tags: ['Binary Options', 'Strategy', 'Education'],
          featured: true
        }
      ];
      setPosts(demoNews);
      localStorage.setItem('newsPosts', JSON.stringify(demoNews));
    }
  }, []);

  // Moved filteredPosts declaration to the top
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.type === selectedCategory);

  const handleCreatePost = () => {
    // Verify admin status before opening editor
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Please log in as admin to create posts",
      });
      navigate('/login');
      return;
    }
    
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleEditPost = (post: NewsPost) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Please log in as admin to edit posts",
      });
      navigate('/login');
      return;
    }
    
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleDeletePost = (postId: string) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Please log in as admin to delete posts",
      });
      navigate('/login');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      localStorage.setItem('newsPosts', JSON.stringify(updatedPosts));
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    }
  };

  const handleSavePost = (postData: Omit<NewsPost, 'id' | 'createdAt' | 'author'>) => {
    if (!isAdmin) {
      toast({
        title: "Session Expired",
        description: "Please log in again to continue",
      });
      setIsEditorOpen(false);
      navigate('/login');
      return;
    }
    
    const userId = sessionStorage.getItem('userId') || 'Admin';
    
    if (editingPost) {
      // Update existing post
      const updatedPosts = posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...postData }
          : post
      );
      setPosts(updatedPosts);
      localStorage.setItem('newsPosts', JSON.stringify(updatedPosts));
      toast({
        title: "Success",
        description: "Post updated successfully",
      });
    } else {
      // Create new post
      const newPost: NewsPost = {
        ...postData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        author: userId
      };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('newsPosts', JSON.stringify(updatedPosts));
      toast({
        title: "Success",
        description: "Post created successfully",
      });
    }
    
    setIsEditorOpen(false);
    setEditingPost(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAdmin(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'news': return FileText;
      case 'insight': return TrendingUp;
      case 'announcement': return Tag;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'from-red-500 to-pink-500';
      case 'news': return 'from-blue-500 to-cyan-500';
      case 'insight': return 'from-purple-500 to-indigo-500';
      case 'announcement': return 'from-green-500 to-teal-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-6">
              <TrendingUp className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-300">Latest Updates</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              News & Updates
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Stay informed with the latest market insights, trading strategies, and platform updates from Elizabeth Trader.
            </p>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="flex justify-center mb-8 gap-4">
                <button
                  onClick={handleCreatePost}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create New Post</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-semibold text-white hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <TrendingUp className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts found</h3>
              <p className="text-gray-500">
                {selectedCategory === 'all' 
                  ? 'No posts have been created yet.' 
                  : `No posts found in the ${categories.find(c => c.id === selectedCategory)?.label} category.`
                }
              </p>
              {isAdmin && (
                <button
                  onClick={handleCreatePost}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Create First Post
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const TypeIcon = getTypeIcon(post.type);
                return (
                  <article
                    key={post.id}
                    className={`group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 ${
                      post.featured ? 'ring-2 ring-purple-500/50' : ''
                    }`}
                  >
                    {/* Video Embed */}
                    {post.type === 'video' && post.videoUrl && (
                      <div className="aspect-video">
                        <iframe
                          src={post.videoUrl}
                          title={post.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`flex items-center space-x-2 px-3 py-1 bg-gradient-to-r ${getTypeColor(post.type)} rounded-full`}>
                          <TypeIcon className="w-4 h-4 text-white" />
                          <span className="text-xs font-medium text-white capitalize">{post.type}</span>
                        </div>
                        {post.featured && (
                          <div className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                            <span className="text-xs font-medium text-yellow-300">Featured</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Content */}
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {post.content}
                      </p>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white/10 rounded-md text-xs text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-gray-400">+{post.tags.length - 3} more</span>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        
                        {isAdmin && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="p-1 text-gray-400 hover:text-purple-300 transition-colors duration-200"
                              title="Edit post"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                              title="Delete post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Call to Action */}
          {!isAdmin && (
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Want to Access Premium Content?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Get exclusive access to advanced trading strategies, live market analysis, and one-on-one mentorship sessions.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
                >
                  <Eye className="w-5 h-5" />
                  <span>Login for Full Access</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* News Editor Modal */}
      {isEditorOpen && (
        <NewsEditor
          post={editingPost}
          onSave={handleSavePost}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingPost(null);
          }}
        />
      )}
    </div>
  );
};

export default News;