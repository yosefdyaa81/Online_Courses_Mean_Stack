import { Course } from './course';

export interface Track {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  courses: Course[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}