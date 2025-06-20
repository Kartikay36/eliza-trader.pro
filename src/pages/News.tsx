import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Calendar, Tag, Video, FileText, TrendingUp, Edit, Trash2, Eye, LogOut } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import NewsEditor from '../components/NewsEditor';
import { useToast } from '../hooks/use-toast';

interface NewsPost {
  _id: string;
  title: string;
  content: string;
  type: 'video' | 'news' | 'insight' | 'announcement';
  videoUrl?: string;
  createdAt: string;
  author: string;
  tags: string[];
  featured: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://eliza-trader-pro.onrender.com/api';

const News = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All Updates', icon: TrendingUp },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'news', label: 'Market News', icon: FileText },
    { id: 'insight', label: 'Market Insights', icon: TrendingUp },
    { id: 'announcement', label: 'Announcements', icon: Tag }
  ];

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    const userRole = sessionStorage.getItem('userRole');
    setIsAdmin(!!authToken && userRole === 'admin');
    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.type === selectedCategory);

  const handleCreatePost = () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Please log in as admin to create posts",
        variant: "destructive"
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
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Please log in as admin to delete posts",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = sessionStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setPosts(posts.filter(post => post._id !== postId));
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting post:', error);
        toast({
          title: "Error",
          description: "Failed to delete post",
          variant: "destructive"
        });
      }
    }
  };

  const handleSavePost = async (postData: Omit<NewsPost, '_id' | 'createdAt' | 'author'>) => {
    if (!isAdmin) {
      toast({
        title: "Session Expired",
        description: "Please log in again to continue",
        variant: "destructive"
      });
      setIsEditorOpen(false);
      navigate('/login');
      return;
    }
    
    try {
      const token = sessionStorage.getItem('authToken');
      const userId = sessionStorage.getItem('userId') || 'Admin';
      
      const url = editingPost 
        ? `${API_BASE_URL}/posts/${editingPost._id}`
        : `${API_BASE_URL}/posts`;
      
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...postData,
          author: userId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedPost = await response.json();
      
      if (editingPost) {
        setPosts(posts.map(p => p._id === editingPost._id ? savedPost : p));
      } else {
        setPosts([savedPost, ...posts]);
      }
      
      toast({
        title: "Success",
        description: `Post ${editingPost ? 'updated' : 'created'} successfully`,
      });
      
      setIsEditorOpen(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive"
      });
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <Navigation />
        <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading posts...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <Navigation />
        <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center py-20">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Error Loading Posts</h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchPosts}
              className="px-6 py-2 bg-purple-500 rounded-lg font-medium text-white hover:bg-purple-600 transition-all duration-200"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                    key={post._id}
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
                              onClick={() => handleDeletePost(post._id)}
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
