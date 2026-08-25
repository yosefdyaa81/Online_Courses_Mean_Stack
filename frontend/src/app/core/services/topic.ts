
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/topics';

  getTopicsByCourse(courseId: string) {
    return this.http.get<any>(
      `${this.apiUrl}/course/${courseId}`
    );
  }
}