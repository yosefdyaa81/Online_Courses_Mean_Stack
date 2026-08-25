export interface Topic {
  _id: string;
  title: string;
  slug: string;
  description: string;
  playlistUrl: string;
  course: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}