import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReview } from '../models/ireview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5000/api/reviews'; // رابط الـ API بتاعك

  constructor(private http: HttpClient) {}

  getReviews(): Observable<IReview[]> {
  return this.http.get<IReview[]>(this.apiUrl);
}

addReview(review: any): Observable<IReview> {
  const token = localStorage.getItem('token');
  return this.http.post<IReview>('http://localhost:5000/api/reviews', review, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}





// deleteReview(id: string): Observable<any> {
//   const token = localStorage.getItem('token');
//   return this.http.delete(`${this.apiUrl}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
// }



}
