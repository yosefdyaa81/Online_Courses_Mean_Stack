export interface IReview {
  _id: string;
  user: { _id: string; name: string; email: string };
  course: { _id: string; title: string; slug: string };
  rating: number;
  comment: string;
  createdAt?: Date;
}
