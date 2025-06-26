export interface NewsPost {
  id: string;
  title: string;
  content: string;
  type: 'video' | 'news' | 'insight' | 'announcement';
  video_url?: string;
  created_at: string;
  author: string;
  tags: string[];
  featured: boolean;
}
