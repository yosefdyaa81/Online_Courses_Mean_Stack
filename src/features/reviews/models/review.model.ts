export class Review {
  constructor(
    public id: number,
    public userName: string,
    public comment: string,
    public rating: number,
    public date: Date,
    public courseId: number
  ) {}
}
