export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  price: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}