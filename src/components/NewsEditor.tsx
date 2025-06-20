
import { useState, useEffect } from 'react';
import { X, Save, Video, FileText, TrendingUp, Tag, Star } from 'lucide-react';

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

interface NewsEditorProps {
  post: NewsPost | null;
  onSave: (post: Omit<NewsPost, 'id' | 'createdAt' | 'author'>) => void;
  onClose: () => void;
}

const NewsEditor = ({ post, onSave, onClose }: NewsEditorProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'news' as 'video' | 'news' | 'insight' | 'announcement',
    videoUrl: '',
    tags: [] as string[],
    featured: false
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        type: post.type,
        videoUrl: post.videoUrl || '',
        tags: post.tags,
        featured: post.featured
      });
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const postTypes = [
    { value: 'news', label: 'Market News', icon: FileText, color: 'from-blue-500 to-cyan-500' },
    { value: 'insight', label: 'Market Insights', icon: TrendingUp, color: 'from-purple-500 to-indigo-500' },
    { value: 'video', label: 'Video Content', icon: Video, color: 'from-red-500 to-pink-500' },
    { value: 'announcement', label: 'Announcement', icon: Tag, color: 'from-green-500 to-teal-500' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter post title..."
              required
            />
          </div>

          {/* Post Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Post Type *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {postTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: type.value as any }))}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      formData.type === type.value
                        ? `bg-gradient-to-r ${type.color} border-transparent text-white`
                        : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video URL (only for video type) */}
          {formData.type === 'video' && (
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Video URL (YouTube Embed)
              </label>
              <input
                type="url"
                id="videoUrl"
                value={formData.videoUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://www.youtube.com/embed/..."
              />
              <p className="text-sm text-gray-400 mt-1">
                Use the embed URL format from YouTube (e.g., https://www.youtube.com/embed/VIDEO_ID)
              </p>
            </div>
          )}

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
              Content *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Write your post content here..."
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-purple-400 hover:text-purple-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-purple-500 border border-purple-500 rounded-r-lg text-white hover:bg-purple-600 transition-colors duration-200"
              >
                Add
              </button>
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 text-purple-500 bg-white/5 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
            />
            <label htmlFor="featured" className="flex items-center space-x-2 text-gray-300">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Mark as Featured Post</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              <Save className="w-5 h-5" />
              <span>{post ? 'Update' : 'Create'} Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsEditor;
